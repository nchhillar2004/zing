"use server";
import prisma from "@/lib/db";
import { TaggedPostsData, replyInclude } from "@/types/post";

export async function getPostsByTagName(name: string, page: number = 1, limit: number = 20): Promise<TaggedPostsData> {
    try {
        const tag = await prisma.tag.findUnique({
            where: { name },
            select: { id: true },
        });

        if (!tag) return { taggedPosts: [], total: 0 };

        const skip = (page - 1) * limit;

        const [rawPosts, total] = await Promise.all([
            prisma.postTag.findMany({
                where: { tagId: tag.id },
                include: {
                    post: {
                        include: replyInclude,
                    },
                },
                skip,
                take: limit,
            }),
            prisma.postTag.count({
                where: { tagId: tag.id },
            })
        ]);

        const taggedPosts = rawPosts.filter(row => row.post !== null);

        return { taggedPosts, total } as TaggedPostsData;
    } catch (error) {
        console.error("Error fetching posts from the tag:", error);
        return { taggedPosts: [], total: 0 };
    }
}

