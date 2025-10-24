import { PostOrReply } from "@/types/post";
import prisma from "@/lib/db";

export async function getPostById(postId: string): Promise<PostOrReply | null> {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        profilePic: true,
                        isVerified: true,
                    },
                },
                parent: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                profilePic: true,
                                isVerified: true,
                            },
                        },
                        _count: {
                            select: {
                                likes: true,
                                replies: true,
                                bookmarks: true,
                                views: true,
                            },
                        },

                    },
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true,
                        bookmarks: true,
                        views: true,
                    },
                },
            },
        });

        return post as PostOrReply;
    } catch (error) {
        console.error("Error fetching post by id:", error);
        return null;
    }
}

