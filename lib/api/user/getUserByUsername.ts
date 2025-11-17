"use server"
import prisma from "@/lib/db";
import { userWithCountsSelect, UserWithCounts } from "@/types/user";
import { toPublicUserDTO, PublicUserDTO } from "@/lib/user-dto";
import { getCurrentUser } from "@/lib/dal";

// Internal function - returns raw Prisma type (for backward compatibility)
export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                ...userWithCountsSelect,
                profileBanner: true,
            }
        });

        return user as UserWithCounts | null;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }
}

// Internal function - returns raw Prisma type (for backward compatibility)
export async function getUserByUsername(username: string): Promise<UserWithCounts | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: userWithCountsSelect,
        });

        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        return null;
    }
}

// DTO-based function - safely parses and returns user data
export async function getUserByUsernameDTO(username: string): Promise<PublicUserDTO | null> {
    try {
        const user = await getUserByUsername(username);
        if (!user) return null;

        const currentUser = await getCurrentUser();
        const viewer = currentUser ? { role: currentUser.role } : null;

        return toPublicUserDTO(user, viewer, currentUser);
    } catch (error) {
        console.error('Error fetching user by username (DTO):', error);
        return null;
    }
}

// DTO-based function - safely parses and returns user data by ID
export async function getUserByIdDTO(id: string): Promise<PublicUserDTO | null> {
    try {
        const user = await getUserById(id);
        if (!user) return null;

        const currentUser = await getCurrentUser();
        const viewer = currentUser ? { role: currentUser.role } : null;

        return toPublicUserDTO(user, viewer, currentUser);
    } catch (error) {
        console.error('Error fetching user by id (DTO):', error);
        return null;
    }
}
