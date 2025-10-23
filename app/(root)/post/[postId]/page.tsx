import PostView from "@/components/common/PostView";
import Header from "@/components/Header";
import { getPostById } from "@/lib/api/getPostById";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

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

    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            viewCount: post?.viewCount+1
        }
    });

    return(
        <>
            <Header variant="title" title="Post" />
            <PostView post={post} />
        </>
    );
}
