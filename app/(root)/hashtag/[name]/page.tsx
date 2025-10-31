import { MessageCircle } from "lucide-react";
import { H2, P, Small } from "@/components/ui/typography";
import PostCard from "@/components/cards/PostCard";
import { getPostsByTagName } from "@/lib/api/post/getPostsByTagName";
import { TaggedPost, TaggedPostsData } from "@/types/post";

interface TagPageProps {
    params: Promise<{
        name: string;
    }>;
}

export default async function TagPage({params}: TagPageProps) {
    const { name } = await params;

    const posts: TaggedPostsData = await getPostsByTagName(name);

    return(
        <>
            <H2 className="px-2">#{name}</H2>
            {posts?.total === 0 ? (
                <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <P className="text-muted-foreground">No posts yet</P>
                    <Small className="text-muted-foreground">Add #{name} to a post to see it here.</Small>
                </div>
            ) : (
                    <div>
                        {posts?.taggedPosts.map((tagPost: TaggedPost) => (
                            <PostCard key={tagPost.id} post={tagPost.post} />
                        ))}
                    </div>
                )}

        </>
    );
}

