import PostView from "@/components/common/PostView";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { getPostById } from "@/lib/api/post/getPostById";
import { updatePostView } from "@/lib/api/post/updatePostViews";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import LoadReplies from "@/components/common/LoadReplies";
import { PostOrReply } from "@/types/post";

interface PostIdPageProps {
    params: Promise<{
        postId: string;
    }>;
}

export default async function PostIdPage({params}: PostIdPageProps) {
    const { postId } = await params;
    const currentUser = await getCurrentUser();

    const post: PostOrReply | null = await getPostById(postId);

    if (!post) {
        redirect("/");
    }

    await updatePostView(post);

    return(
        <>
            <PostView post={post} />
            {currentUser && <CreatePostForm user={currentUser} parent={post} type="REPLY" />}
            <LoadReplies post={post} />
        </>
    );
}
