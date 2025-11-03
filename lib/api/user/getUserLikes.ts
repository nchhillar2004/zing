"use server";
import prisma from "@/lib/db";
import { LikesData, replyInclude } from "@/types/post";

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
                        include: replyInclude,
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

        return { likes, total };
    } catch (error) {
        console.error("Error fetching user likes:", error);
        return { likes: [], total: 0 };
    }
}

