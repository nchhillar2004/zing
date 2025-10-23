"use server";
import { PostData } from "@/components/profile/ProfileTabs";
import prisma from "@/lib/db";

export async function getUserPosts(username: string, page: number = 1, limit: number = 10): Promise<PostData> {
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
                            profilePic: true,
                            isVerified: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            views: true,
                            replies: true,
                            bookmarks: true,
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

        return { posts, total } as PostData;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return { posts: [], total: 0 };
    }
}
