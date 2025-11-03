"use server";
import prisma from "@/lib/db";
import { BookmarksData, replyInclude } from "@/types/post";

export async function getUserBookmarks(username: string, page: number = 1, limit: number = 10): Promise<BookmarksData> {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (!user) return { bookmarks: [], total: 0 };

        const skip = (page - 1) * limit;

        const [bookmarks, total] = await Promise.all([
            prisma.bookmark.findMany({
                where: { userId: user.id },
                include: {
                    post: {
                        include: replyInclude,
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.bookmark.count({
                where: { userId: user.id },
            })
        ]);

        return { bookmarks, total };
    } catch (error) {
        console.error("Error fetching user bookmarks:", error);
        return { bookmarks: [], total: 0 };
    }
}
