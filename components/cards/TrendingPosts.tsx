import { CardDescription, Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { Small } from "../ui/typography";
import { getTopLikedPosts } from "@/lib/api/post/getTopLikedPosts";
import { sanitizeHtml } from "@/lib/sanitize";

export default async function TrendingPosts() {
    const posts = await getTopLikedPosts(20);

    if (posts.length === 0) {
        return null;
    }

    const sanitizedPosts = await Promise.all(
        posts.map(async (post) => ({
            ...post,
            sanitizedContent: await sanitizeHtml(post.content),
        }))
    );

    return (
        <Card title="Trending" className="w-full">
            <CardHeader>
                <CardTitle>Top Liked Posts</CardTitle>
                <CardDescription>Most liked posts right now.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 list-item">
                    {sanitizedPosts.map((post) => (
                        <li key={post.id} className="flex items-center flex-wrap space-x-2">
                            <Link
                                href={`/post/${post.id}`}
                                className="text-primary font-semibold line-clamp-2 overflow-ellipsis"
                                dangerouslySetInnerHTML={{ __html: post.sanitizedContent }}
                            />
                            <span className="text-sm text-foreground/60">
                                {post.likeCount} likes
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Small>
                    <Link href="/trending" className="text-primary">
                        View all
                    </Link>
                </Small>
            </CardFooter>
        </Card>
    );
}

