import { PostWithAuthor } from "@/interfaces/post";
import prisma from "@/lib//db";

export async function getPostById(postId: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                content: true,
                likeCount: true,
                replyCount: true,
                viewCount: true,
                validViewCount: true,
                authorId: true,
                createdAt: true,
                updatedAt: true,
                parentId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        profilePic: true,
                        isVerified: true,
                    }
                },
                _count: {
                    select: {
                        bookmarks: true,
                        views: true,
                    }
                }
            }
        });

        return post as PostWithAuthor;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
}
