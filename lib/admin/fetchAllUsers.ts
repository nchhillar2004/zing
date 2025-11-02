"use server"
import prisma from "@/lib/db";
import { UserWithCounts } from "@/interfaces/user";

export async function fetchAllUsers(page: number = 1, limit: number = 50): Promise<UserWithCounts[]> {
    const skip = (page - 1) * limit;
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                dob: true,
                country: true,
                isVerified: true,
                profilePic: true,
                isSpam: true,
                role: true,
                premiumTier: true,
                accountType: true,
                accountPrivacy: true,
                moderationStatus: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        posts: true,
                        followers: true,
                        follows: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });
        return users as UserWithCounts[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

