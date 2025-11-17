"use server";
import prisma from "@/lib/db";
import { PostWithAuthor, postInclude } from "@/types/post";

export async function getTopLikedPosts(limit: number = 20): Promise<PostWithAuthor[]> {
    try {
        const posts = await prisma.post.findMany({
            where: {
                postType: "POST",
                postPrivacy: "PUBLIC",
            },
            include: postInclude,
            orderBy: [
                { likeCount: 'desc' },
                { createdAt: 'desc' }
            ],
            take: limit,
        });

        return posts;
    } catch (error) {
        console.error("Error fetching top liked posts:", error);
        return [];
    }
}

