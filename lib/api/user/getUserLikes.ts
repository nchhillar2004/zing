"use server";
import prisma from "@/lib/db";
import { LikesData } from "@/components/profile/ProfileTabs";

export async function getUserLikes(username: string, page: number = 1, limit: number = 10): Promise<LikesData> {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (!user) return { likes: [], total: 0 };

        const skip = (page - 1) * limit;

        const [likes, total] = await Promise.all([
            prisma.like.findMany({
                where: { userId: user.id },
                include: {
                    post: {
                        include: {
                            parent: {
                                include:{
                                    author: {
                                        select: {
                                            name: true,
                                            username: true,
                                            profilePic: true,
                                            isVerified: true,
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
                                }
                            },
                            author: {
                                select: {
                                    name: true,
                                    username: true,
                                    profilePic: true,
                                    isVerified: true,
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
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.like.count({
                where: { userId: user.id },
            })
        ]);

        return { likes, total } as LikesData;
    } catch (error) {
        console.error("Error fetching user likes:", error);
        return { likes: [], total: 0 };
    }
}

