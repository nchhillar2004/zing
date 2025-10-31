"use server";
import prisma from "@/lib/db";
import { TaggedPostsData } from "@/types/post";

export async function getPostsByTagName(name: string, page: number = 1, limit: number = 20): Promise<TaggedPostsData> {
    try {
        const tag = await prisma.tag.findUnique({
            where: { name },
            select: { id: true },
        });

        if (!tag) return { taggedPosts: [], total: 0 };

        const skip = (page - 1) * limit;

        const [taggedPosts, total] = await Promise.all([
            prisma.postTag.findMany({
                where: { tagId: tag.id },
                include: {
                    post: {
                        include: {
                            parent: {
                                include:{
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
                                }
                            },
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
                    },
                },
                skip,
                take: limit,
            }),
            prisma.postTag.count({
                where: { tagId: tag.id },
            })
        ]);

        return { taggedPosts, total } as TaggedPostsData;
    } catch (error) {
        console.error("Error fetching posts from the tag:", error);
        return { taggedPosts: [], total: 0 };
    }
}

