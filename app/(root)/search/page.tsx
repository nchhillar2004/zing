import type { Metadata } from 'next';
import { siteConfig } from '@/config/site-config';
import Link from 'next/link';
import PostCard from '@/components/cards/PostCard';
import { PostWithAuthor } from '@/types/post';
import { UserWithCounts } from '@/interfaces/user';
import { getPostById } from '@/lib/api/post/getPostById';
import { HoverProfileCard } from '@/components/cards/HoverProfileCard';
import { getUserById } from '@/lib/api/user/getUserByUsername';
import { H3 } from '@/components/ui/typography';

export const metadata: Metadata = {
    title: "Search / Zing",
};

export interface SearchData {
    users: UserWithCounts[];
    posts: PostWithAuthor[];
}

export default async function SearchPage( props: { searchParams?: Promise<{ query?: string; }> }) {
    const searchParams = await props.searchParams;
    const query = searchParams && searchParams.query?.trim();

    if (!query){
        return (
            <p>Search something to get results!</p>
        );
    }
    const res = await fetch(`${siteConfig.BASE_URL}/api/search?query=${encodeURIComponent(query ?? '')}`, {cache: 'no-store'});
    const data = await res.json();

    return (
        <div className='link space-y-2'>
            <p className='text-muted'>Showing results for &apos;{query}&apos;...</p>
            <ul><H3>Users:</H3>
                {data.users.length>0 ? data.users.map(async(data: UserWithCounts) => {
                    const user = await getUserById(data.id);
                    if(!user) return;
                    return(
                        <li key={data.id}>
                            <Link href={`/user/${data.username}`}>
                                <HoverProfileCard user={user} />
                            </Link>
                        </li>
                    )}) : <small>No users found from this username.</small>}
            </ul>
            <ul><H3>Posts:</H3>
                {data.posts.length>0 ? data.posts.map( async (data: PostWithAuthor) => {
                    const post = await getPostById(data.id);
                    if(!post) return;
                    return (
                        <li key={data.id}>
                            <PostCard post={post} />
                        </li>
                    )}) : <small>No related posts found.</small>}
            </ul>
        </div>
    );
}

