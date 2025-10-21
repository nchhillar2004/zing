"use server";
import { RepliesData } from "@/components/profile/ProfileTabs";
import prisma from "../db";

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
                            profilePic: true,
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
                                    profilePic: true,
                                    isVerified: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
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
                    postType: 'REPLY'
                }
            })
        ]);

        return { replies, total } as RepliesData;
    } catch (error) {
        console.error('Error fetching user replies:', error);
        return { replies: [], total: 0 };
    }
}
