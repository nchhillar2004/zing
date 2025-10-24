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
        }
    });
    if (liked) return true;
    return false;
}

export async function likePost(post: PostOrReply) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return { success: false, error: "login to like a post" };

    try {
        if (await isPostLiked(post)){
            await prisma.like.delete({
                where: {
                    userId_postId: { userId: currentUser.id, postId: post.id },
                }
            });
            return { success: true, message: "UNLIKED" as LikeType };
        }
        await prisma.like.create({
            data: {
                userId: currentUser.id,
                postId: post.id
            }
        });
        return { success: true, message: "LIKED" as LikeType };
    } catch (err) {
        return { success: false, error: err };
    }
}
