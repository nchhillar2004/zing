// Data Access Layer (DAL)
"use server"
import { cookies } from 'next/headers'
import { getSession } from './session';
import prisma from './db';
import { CurrentUser, UserWithCounts } from '@/interfaces/user';

export async function verifySession() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) return null;

    const session = await getSession(sessionId);

    if (!session) return null;

    return { isAuth: true, userId: session.userId };
};

export async function getCurrentUser() {
    const sessionData = await verifySession();
    
    if (!sessionData) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: sessionData.userId },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                bio: true,
                dob: true,
                isVerified: true,
                premiumTier: true,
                accountType: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        follows: true,
                        posts: true,
                    }
                }
            }
        });

        return user as UserWithCounts;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};
