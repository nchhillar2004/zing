import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/dal';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const session = await getCurrentUser();
    if (!session?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.id as string;
    const cursor = req.query.cursor as string | undefined;
    const take = 10;
    const matchingRatio = 0.8;
    const matchingTake = Math.floor(take * matchingRatio);
    const exploratoryTake = take - matchingTake;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { interests: true, selectedCategories: true },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allInterests = [...user.interests, ...user.selectedCategories];

        const whereBase = cursor ? { createdAt: { lt: new Date(cursor) } } : {};

        const matchingPosts = await prisma.post.findMany({
            where: {
                ...whereBase,
                tags: { some: { in: allInterests } },
            },
            orderBy: { createdAt: 'desc' },
            take: matchingTake,
        });

        const exploratoryPosts = await prisma.post.findMany({
            where: {
                ...whereBase,
                tags: { none: { in: allInterests } },
                likeCount: { gte: 5 },
            },
            orderBy: [{ likeCount: 'desc' }, { createdAt: 'desc' }],
            take: exploratoryTake,
        });

        const posts = [...matchingPosts, ...exploratoryPosts].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const nextCursor = posts.length === take ? posts[posts.length - 1].createdAt.toISOString() : undefined;

        res.status(200).json({ posts, nextCursor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
