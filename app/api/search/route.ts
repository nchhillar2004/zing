import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/dal';
import { toPublicUserDTO, PublicUserDTO } from '@/lib/user-dto';
import { userWithCountsSelect, UserWithCounts } from '@/types/user';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ error: 'Missing query' }, { status: 400 });
        }

        const q = query.trim();
        const currentUser = await getCurrentUser();
        const viewer = currentUser ? { role: currentUser.role } : null;

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
                select: userWithCountsSelect,
            })
        ]);

        // Safely parse users to DTOs
        const safeUsers: PublicUserDTO[] = users
            .map((user) => toPublicUserDTO(user as UserWithCounts, viewer, currentUser))
            .filter((dto): dto is PublicUserDTO => dto !== null);

        return NextResponse.json({ posts, users: safeUsers });
    } catch (err) {
        console.error('[API /search error]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
