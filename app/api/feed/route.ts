import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/dal';

export async function GET(request: NextRequest) {
    const session = await getCurrentUser();
    if (!session?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.id as string;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor') || undefined;
    const take = 10;
    const matchingRatio = 0.8;
    const matchingTake = Math.floor(take * matchingRatio);
    const exploratoryTake = take - matchingTake;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                interests: { select: { tagId: true } },
                selectedCategories: true 
            },
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        
        // Get tag IDs from user interests
        const interestTagIds = user.interests.map(interest => interest.tagId);
        
        // Get tag IDs from selected categories
        const categoryTagIds = await prisma.tag.findMany({
            where: {
                category: { in: user.selectedCategories || [] }
            },
            select: { id: true }
        });
        
        const allTagIds = [...interestTagIds, ...categoryTagIds.map(t => t.id)];
        const uniqueTagIds = Array.from(new Set(allTagIds));

        const whereBase = cursor ? { createdAt: { lt: new Date(cursor) } } : {};

        const matchingPosts = await prisma.post.findMany({
            where: {
                ...whereBase,
                tags: {
                    some: {
                        tagId: { in: uniqueTagIds }
                    }
                },
            },
            orderBy: { createdAt: 'desc' },
            take: matchingTake,
        });

        const exploratoryPosts = await prisma.post.findMany({
            where: {
                ...whereBase,
                tags: {
                    none: {
                        tagId: { in: uniqueTagIds }
                    }
                },
                likeCount: { gte: 5 },
            },
            orderBy: [{ likeCount: 'desc' }, { createdAt: 'desc' }],
            take: exploratoryTake,
        });

        const posts = [...matchingPosts, ...exploratoryPosts].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const nextCursor = posts.length === take ? posts[posts.length - 1].createdAt.toISOString() : undefined;

        return NextResponse.json({ posts, nextCursor });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
