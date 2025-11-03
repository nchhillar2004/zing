"use server"
import prisma from "@/lib/db";
import { userWithCountsSelect, UserWithCounts } from "@/types/user";

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
