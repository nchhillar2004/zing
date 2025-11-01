"use server";
import { LikeType } from "@/components/common/PostView";
import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";
import { PostOrReply } from "@/types/post";

export async function isPostLiked(post: PostOrReply) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return false;

    const liked = await prisma.like.findUnique({
        where: {
            userId_postId: { userId: currentUser.id, postId: post.id },
        },
    });
    return !!liked;
}

export async function likePost(post: PostOrReply) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return { success: false, error: "login to like a post" };

    try {
        const alreadyLiked = await prisma.like.findUnique({
            where: {
                userId_postId: { userId: currentUser.id, postId: post.id },
            },
        });

        if (alreadyLiked) {
            await prisma.$transaction([
                prisma.like.delete({
                    where: {
                        userId_postId: { userId: currentUser.id, postId: post.id },
                    },
                }),
                prisma.post.update({
                    where: { id: post.id },
                    data: { likeCount: { increment: -1 } },
                }),
            ]);
            return { success: true, message: "UNLIKED" as LikeType };
        } else {
            await prisma.$transaction([
                prisma.like.create({
                    data: {
                        userId: currentUser.id,
                        postId: post.id,
                    },
                }),
                prisma.post.update({
                    where: { id: post.id },
                    data: { likeCount: { increment: 1 } },
                }),
            ]);
            return { success: true, message: "LIKED" as LikeType };
        }
    } catch (err) {
        return { success: false, error: err };
    }
}
