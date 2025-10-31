import { CardDescription, Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { Small } from "../ui/typography";
import { getTrendingPosts } from "@/lib/api/post/getTrendingPosts";
import { PostWithAuthor } from "@/types/post";

export default async function WhoToFollow() {
    const posts: PostWithAuthor[] = await getTrendingPosts();
    return(
        <Card>
            <CardHeader>
                <CardTitle>Who to follow</CardTitle>
                <CardDescription>Top users to follow.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 list-item">
                    {posts && posts.map((post: PostWithAuthor) => (
                        <li key={post.id} className="flex items-center flex-wrap space-x-2">
                            <Link href={`/post/${post.id}`} className="text-primary font-semibold line-clamp-2 overflow-ellipsis">
                                {post.content}
                            </Link>
                            <span className="text-sm text-foreground/60">{post.viewCount} views just now</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Small><Link href={"/trending"} className="text-primary">View all</Link></Small>
            </CardFooter>
        </Card>

    );
}

