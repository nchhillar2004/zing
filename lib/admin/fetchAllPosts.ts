"use server"
import { PostData } from "@/components/profile/ProfileTabs";
import prisma from "@/lib/db";

export async function fetchAllPosts(page: number = 1, limit: number = 50): Promise<PostData> {
    const skip = (page - 1) * limit;

    try{
        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            bio: true,
                            profilePic: true,
                            premiumTier: true,
                            isVerified: true,
                            createdAt: true,
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
            prisma.post.count()
        ]);

        return { posts, total } as PostData; 
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {posts: [], total: 0};
    }
}

