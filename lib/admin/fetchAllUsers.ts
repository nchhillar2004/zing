"use server"
import prisma from "@/lib/db";
import { UserWithCounts, userWithCountsSelect } from "@/types/user";
import { toPublicUserDTOArray, PublicUserDTO } from "@/lib/user-dto";
import { getCurrentUser } from "@/lib/dal";

// Internal function - returns raw Prisma type (for backward compatibility)
export async function fetchAllUsers(page: number = 1, limit: number = 50): Promise<UserWithCounts[]> {
    const skip = (page - 1) * limit;
    try {
        const users = await prisma.user.findMany({
            select: userWithCountsSelect,
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

// DTO-based function - safely parses and returns user data
export async function fetchAllUsersDTO(page: number = 1, limit: number = 50): Promise<PublicUserDTO[]> {
    try {
        const users = await fetchAllUsers(page, limit);
        const currentUser = await getCurrentUser();
        const viewer = currentUser ? { role: currentUser.role } : null;

        return toPublicUserDTOArray(users, viewer, currentUser);
    } catch (error) {
        console.error('Error fetching users (DTO):', error);
        return [];
    }
}

