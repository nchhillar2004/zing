// Data Access Layer (DAL)
"use server"
import { cookies } from 'next/headers'
import { getSession } from './session';
import prisma from './db';

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
                isVerified: true,
                premiumTier: true,
                accountType: true,
                createdAt: true
            }
        });

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

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
        console.error('Error fetching user by username:', error);
        return null;
    }
}

export async function getUserPosts(username: string, page: number = 1, limit: number = 10) {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true }
        });

        if (!user) return { posts: [], total: 0 };

        const skip = (page - 1) * limit;
        
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where: { 
                    authorId: user.id,
                    postType: 'POST'
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            isVerified: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            replies: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.post.count({
                where: { 
                    authorId: user.id,
                    postType: 'POST'
                }
            })
        ]);

        return { posts, total };
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return { posts: [], total: 0 };
    }
}

export async function getUserReplies(username: string, page: number = 1, limit: number = 10) {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true }
        });

        if (!user) return { replies: [], total: 0 };

        const skip = (page - 1) * limit;
        
        const [replies, total] = await Promise.all([
            prisma.post.findMany({
                where: { 
                    authorId: user.id,
                    postType: 'REPLY'
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            isVerified: true
                        }
                    },
                    parent: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    name: true,
                                    username: true,
                                    isVerified: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            replies: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.post.count({
                where: { 
                    authorId: user.id,
                    postType: 'REPLY'
                }
            })
        ]);

        return { replies, total };
    } catch (error) {
        console.error('Error fetching user replies:', error);
        return { replies: [], total: 0 };
    }
}
