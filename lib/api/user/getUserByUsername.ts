"use server"
import prisma from "@/lib//db";

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                dob: true,
                country: true,
                profilePic: true,
                isVerified: true,
                isSpam: true,
                role: true,
                premiumTier: true,
                accountType: true,
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
            }
        });

        return user;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }
}

export async function getUserByUsername(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
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
            }
        });

        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        return null;
    }
}
