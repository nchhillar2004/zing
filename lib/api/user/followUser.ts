"use server";
import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";
import { FollowStatus } from "@prisma/client";

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
    try {
        const follow = await prisma.follow.findFirst({
            where: {
                followerId,
                followingId,
            },
        });
        return !!follow && follow.status === "APPROVED";
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false;
    }
}

export async function followUser(followingId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return { success: false, error: "Not authenticated" };
    }

    if (currentUser.id === followingId) {
        return { success: false, error: "Cannot follow yourself" };
    }

    try {
        // Check if already following
        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: currentUser.id,
                followingId,
            },
        });

        if (existingFollow) {
            // If already following, unfollow
            if (existingFollow.status === "APPROVED") {
                await prisma.follow.delete({
                    where: {
                        id: existingFollow.id,
                    },
                });
                return { success: true, message: "UNFOLLOWED" };
            }
            // If pending, cancel the request
            if (existingFollow.status === "PENDING") {
                await prisma.follow.delete({
                    where: {
                        id: existingFollow.id,
                    },
                });
                return { success: true, message: "UNFOLLOWED" };
            }
            return { success: false, error: "Cannot modify follow status" };
        }

        // Check if target user has private account
        const targetUser = await prisma.user.findUnique({
            where: { id: followingId },
            select: { accountPrivacy: true },
        });

        const status: FollowStatus = targetUser?.accountPrivacy === "PRIVATE" 
            ? "PENDING" 
            : "APPROVED";

        await prisma.follow.create({
            data: {
                followerId: currentUser.id,
                followingId,
                status,
            },
        });

        return { success: true, message: status === "PENDING" ? "REQUESTED" : "FOLLOWED" };
    } catch (error) {
        console.error("Error following user:", error);
        return { success: false, error: "Failed to follow user" };
    }
}

