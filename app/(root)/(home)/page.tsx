import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { getHomeFeed } from "@/lib/api/post/getHomeFeed";
import PostCard from "@/components/cards/PostCard";
import { P } from "@/components/ui/typography";
import { MessageCircle } from "lucide-react";

export default async function HomePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        logout();
        return;
    }
    if (currentUser.selectedCategories.length===0) redirect("/getting-started");

    const posts = await getHomeFeed(10);

    return (
        <div>
            <CreatePostForm user={currentUser} />
            {posts.length === 0 ? (
                <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <P className="text-muted-foreground">No posts yet</P>
                    <P className="text-sm text-muted-foreground">Be the first to post something!</P>
                </div>
            ) : (
                <div>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
