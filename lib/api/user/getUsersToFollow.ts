"use server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/dal";
import { AuthorLite, authorLiteSelect } from "@/types/user";
import { toAuthorLiteDTOArray, AuthorLiteDTO } from "@/lib/user-dto";
import { Prisma } from "@prisma/client";

export async function getUsersToFollow(limit: number = 4): Promise<AuthorLiteDTO[]> {
    try {
        const currentUser = await getCurrentUser();
        const currentUserId = currentUser?.id;

        // Get users with most followers (top followed)
        const whereClause: Prisma.UserWhereInput = {
            moderationStatus: "ACTIVE",
            isSpam: false,
        };
        
        if (currentUserId) {
            whereClause.id = { not: currentUserId };
        }

        // Get top followed users by counting followers
        const topFollowedUsersRaw = await prisma.user.findMany({
            where: whereClause,
            select: {
                ...authorLiteSelect,
                _count: {
                    select: {
                        followers: true,
                    }
                }
            },
            take: limit * 2, // Get more to sort properly
        });

        // Sort by follower count and take top N
        const topFollowedUsers = topFollowedUsersRaw
            .sort((a, b) => (b._count?.followers || 0) - (a._count?.followers || 0))
            .slice(0, limit)
            .map(({ _count, ...user }) => user); // Remove _count before converting to DTO

        // If we don't have enough top followed users, fill with oldest users
        if (topFollowedUsers.length < limit) {
            const excludeIds = [...topFollowedUsers.map(u => u.id)];
            if (currentUserId) {
                excludeIds.push(currentUserId);
            }

            const oldestUsers = await prisma.user.findMany({
                where: {
                    id: { notIn: excludeIds },
                    moderationStatus: "ACTIVE",
                    isSpam: false,
                },
                select: authorLiteSelect,
                orderBy: {
                    createdAt: 'asc'
                },
                take: limit - topFollowedUsers.length,
            });

            const allUsers = [...topFollowedUsers, ...oldestUsers];
            return toAuthorLiteDTOArray(allUsers as AuthorLite[]);
        }

        return toAuthorLiteDTOArray(topFollowedUsers as AuthorLite[]);
    } catch (error) {
        console.error("Error fetching users to follow:", error);
        return [];
    }
}

