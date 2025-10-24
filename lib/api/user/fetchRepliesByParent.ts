"use server";
import { RepliesData } from "@/components/profile/ProfileTabs";
import prisma from "@/lib/db";

export async function fetchRepliesByParent(parentId: string, page: number = 1, limit: number = 10): Promise<RepliesData> {
    try {
        if (!parentId) return { replies: [], total: 0 };

        const skip = (page - 1) * limit;
        
        const [replies, total] = await Promise.all([
            prisma.post.findMany({
                where: { 
                    parentId: parentId,
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
                        select: {
                            parent: {
                                select: {
                                    id: true,
                                    content: true,
                                    files: true,
                                    _count: {
                                        select: {
                                            likes: true,
                                            views: true,
                                            replies: true,
                                            bookmarks: true,
                                        }
                                    }
                                }
                            },
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
                    parentId,
                    postType: 'REPLY'
                }
            })
        ]);

        return { replies, total } as RepliesData;
    } catch (error) {
        console.error('Error fetching replies for a parent:', error);
        return { replies: [], total: 0 };
    }
}

