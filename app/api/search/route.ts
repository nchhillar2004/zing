import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ error: 'Missing query' }, { status: 400 });
        }

        const q = query.trim();

        const [posts, users] = await Promise.all([
            prisma.post.findMany({
                where: {
                    content: {
                        contains: q,
                    },
                },
                take: 5,
                select: { 
                    id: true, 
                    content: true
                },
            }),
            prisma.user.findMany({
                where: {
                    username: {
                        contains: q,
                    },
                },
                take: 5,
                select: { 
                    id: true, 
                    username: true,
                },
            })
        ]);

        return NextResponse.json({ posts, users });
    } catch (err) {
        console.error('[API /search error]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
