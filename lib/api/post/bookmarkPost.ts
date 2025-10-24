"use server";
import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";
import { PostOrReply } from "@/types/post";
import { BookType } from "@/components/common/PostView";

export async function isPostBookmarked(post: PostOrReply) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return false;

    const booked = await prisma.bookmark.findUnique({
        where: {
            userId_postId: { userId: currentUser.id, postId: post.id },
        }
    });
    if (booked) return true;
    return false;
}

export async function bookmarkPost(post: PostOrReply) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return { success: false, error: "login to bookmark a post" };

    try {
        if (await isPostBookmarked(post)){
            await prisma.bookmark.delete({
                where: {
                    userId_postId: { userId: currentUser.id, postId: post.id },
                }
            });
            return { success: true, message: "UNBOOK" as BookType };
        }
        await prisma.bookmark.create({
            data: {
                userId: currentUser.id,
                postId: post.id
            }
        });
        return { success: true, message: "BOOK" as BookType };
    } catch (err) {
        return { success: false, error: err };
    }
}

