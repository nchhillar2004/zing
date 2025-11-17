// Data Access Layer (DAL)
"use server"
import { cookies } from 'next/headers'
import { getSession } from './session';
import prisma from './db';
import { CurrentUser, currentUserSelect } from '@/types/user';
import { toCurrentUserDTO, CurrentUserDTO } from '@/lib/user-dto';

export async function verifySession() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) return null;

    const session = await getSession(sessionId);

    if (!session) return null;

    return { isAuth: true, userId: session.userId };
};

// Internal function - returns raw Prisma type (for backward compatibility)
export async function getCurrentUser(): Promise<CurrentUser | null> {
    const sessionData = await verifySession();
    
    if (!sessionData) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: sessionData.userId },
            select: currentUserSelect,
        });

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

// DTO-based function - safely parses and returns current user data
export async function getCurrentUserDTO(): Promise<CurrentUserDTO | null> {
    try {
        const user = await getCurrentUser();
        if (!user) return null;

        return toCurrentUserDTO(user);
    } catch (error) {
        console.error('Error fetching current user (DTO):', error);
        return null;
    }
}
