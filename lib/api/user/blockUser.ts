"use server";
import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";

export async function isBlocked(blockerId: string, blockedId: string): Promise<boolean> {
    try {
        const block = await prisma.userBlock.findFirst({
            where: {
                blockerId,
                blockedId,
            },
        });
        return !!block;
    } catch (error) {
        console.error("Error checking block status:", error);
        return false;
    }
}

export async function blockUser(blockedId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return { success: false, error: "Not authenticated" };
    }

    if (currentUser.id === blockedId) {
        return { success: false, error: "Cannot block yourself" };
    }

    try {
        // Check if already blocked
        const existingBlock = await prisma.userBlock.findFirst({
            where: {
                blockerId: currentUser.id,
                blockedId,
            },
        });

        if (existingBlock) {
            // Unblock
            await prisma.userBlock.delete({
                where: {
                    id: existingBlock.id,
                },
            });
            return { success: true, message: "UNBLOCKED" };
        }

        // Block user
        await prisma.userBlock.create({
            data: {
                blockerId: currentUser.id,
                blockedId,
            },
        });

        // Also remove follow relationship if exists
        await prisma.follow.deleteMany({
            where: {
                OR: [
                    {
                        followerId: currentUser.id,
                        followingId: blockedId,
                    },
                    {
                        followerId: blockedId,
                        followingId: currentUser.id,
                    },
                ],
            },
        });

        return { success: true, message: "BLOCKED" };
    } catch (error) {
        console.error("Error blocking user:", error);
        return { success: false, error: "Failed to block user" };
    }
}

