import PostView from "@/components/common/PostView";
import Header from "@/components/Header";
import { getPostById } from "@/lib/api/post/getPostById";
import { updatePostView } from "@/lib/api/post/updatePostViews";
import { redirect } from "next/navigation";

interface PostIdPageProps {
    params: Promise<{
        postId: string;
    }>;
}

export default async function PostIdPage({params}: PostIdPageProps) {
    const { postId } = await params;

    const post = await getPostById(postId);

    if (!post) {
        redirect("/");
    }

    await updatePostView(post);

    return(
        <>
            <Header variant="title" title="Post" />
            <PostView post={post} />
        </>
    );
}
