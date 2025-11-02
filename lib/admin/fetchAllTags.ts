"use server"
import prisma from "@/lib/db";

export type TagWithCount = {
    id: string;
    name: string;
    category: string | null;
    createdAt: Date;
    _count: {
        posts: number;
    };
};

export async function fetchAllTags(page: number = 1, limit: number = 100): Promise<TagWithCount[]> {
    const skip = (page - 1) * limit;
    try {
        const tags = await prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        });
        return tags;
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
}

