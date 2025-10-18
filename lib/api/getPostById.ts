import prisma from "../db";

export async function getPostById(postId: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                content: true,
                likeCount: true,
                replyCount: true,
                authorId: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        bookmarks: true,
                    }
                }
            }
        });

        return post;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
}
