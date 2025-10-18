import { getUserByUsername, getUserPosts, getUserReplies } from "@/lib/dal";
import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/ProfilePageClient";
import Header from "@/components/Header";

interface UserProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    const { username } = await params;
    
    const [user, postsData, repliesData] = await Promise.all([
        getUserByUsername(username),
        getUserPosts(username),
        getUserReplies(username)
    ]);

    if (!user) {
        notFound();
    }

    return (
        <>
        <Header variant="title" title={`@${user.username}`} />
        <ProfilePageClient 
            user={user}
            posts={postsData.posts}
            replies={repliesData.replies}
            postsTotal={postsData.total}
            repliesTotal={repliesData.total}
        />
        </>
    );
}

