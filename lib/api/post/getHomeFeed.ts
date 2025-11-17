"use server";
import prisma from "@/lib/db";
import { PostOrReply, replyInclude } from "@/types/post";

export async function getHomeFeed(limit: number = 10): Promise<PostOrReply[]> {
    try {
        const posts = await prisma.post.findMany({
            where: {
                postPrivacy: "PUBLIC",
            },
            include: replyInclude,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return posts;
    } catch (error) {
        console.error("Error fetching home feed:", error);
        return [];
    }
}

