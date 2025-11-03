"use server"
import { PostOrReply, replyInclude } from "@/types/post";
import prisma from "@/lib/db";

export async function getPostById(postId: string): Promise<PostOrReply | null> {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: replyInclude,
        });

        return post;
    } catch (error) {
        console.error("Error fetching post by id:", error);
        return null;
    }
}

