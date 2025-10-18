"use server";
import prisma from "../db";

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
