"use server";
import prisma from "@/lib/db";
import { PostWithAuthor, postInclude } from "@/types/post";

export async function getTrendingPosts(): Promise<PostWithAuthor[]> {
    try {
        const timeRanges = [
            6,  // last 6 hours
            12, // last 12 hours
            24, // last 24 hours
            24 * 7, // last 7 days
            null // all time
        ];

        for (const hours of timeRanges) {
            const timeFilter = hours
                ? { gte: new Date(Date.now() - hours * 60 * 60 * 1000) }
                : undefined;

            const grouped = await prisma.postView.groupBy({
                by: ["postId"],
                where: timeFilter ? { createdAt: timeFilter } : undefined,
                _count: { postId: true },
                orderBy: { _count: { postId: "desc" } },
                take: 4,
            });

            if (grouped.length > 0) {
                const posts = await prisma.post.findMany({
                    where: {
                        id: { in: grouped.map((g) => g.postId) },
                        postType: "POST",
                        postPrivacy: "PUBLIC"
                    },
                    include: postInclude,
                });

                const sorted = posts.sort(
                    (a, b) =>
                        (grouped.find((g) => g.postId === b.id)?._count.postId || 0) -
                            (grouped.find((g) => g.postId === a.id)?._count.postId || 0)
                );

                return sorted;
            }
        }

        return [];
    } catch (error) {
        console.error("Error fetching trending posts:", error);
        return [];
    }
}

