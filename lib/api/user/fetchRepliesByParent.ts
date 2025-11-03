"use server";
import { RepliesData } from "@/components/profile/ProfileTabs";
import prisma from "@/lib/db";
import { replyInclude } from "@/types/post";

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
                include: replyInclude,
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

        return { replies, total };
    } catch (error) {
        console.error('Error fetching replies for a parent:', error);
        return { replies: [], total: 0 };
    }
}

