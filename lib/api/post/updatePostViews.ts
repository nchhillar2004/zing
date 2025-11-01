"use server"
import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";
import { PostOrReply } from "@/types/post";
import { getCurrentTime } from "@/utils/time";

export async function updatePostView(post: PostOrReply) {
    const currentUser = await getCurrentUser();

    // Always increment total view count
    await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
    });

    // If user not logged in, stop here
    if (!currentUser) {
        return { success: true, message: "Login to record a valid view" };
    }

    try {
        // Check if this user already viewed the post
        const existingView = await prisma.postView.findUnique({
            where: {
                viewerId_postId: { viewerId: currentUser.id, postId: post.id },
            },
        });

        if (existingView) {
            // Just update the timestamp
            await prisma.postView.update({
                where: { viewerId_postId: { viewerId: currentUser.id, postId: post.id } },
                data: { lastViewedAt: getCurrentTime() },
            });
        } else {
            // First time valid view — record + increment valid count
            await prisma.$transaction([
                prisma.postView.create({
                    data: {
                        viewerId: currentUser.id,
                        postId: post.id,
                        lastViewedAt: getCurrentTime(),
                    },
                }),
                prisma.post.update({
                    where: { id: post.id },
                    data: { validViewCount: { increment: 1 } },
                }),
            ]);
        }

        return { success: true, message: "Post view updated" };
    } catch (err) {
        console.error(err);
        return { success: false, error: err };
    }
}

