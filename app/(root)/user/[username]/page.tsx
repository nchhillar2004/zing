import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getUserByUsername } from "@/lib/api/getUserByUsername";
import UserBanner from "@/components/profile/UserBanner";
import UserDetails from "@/components/profile/UserDetails";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getCurrentUser } from "@/lib/dal";

interface UserProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    const { username } = await params;

    const user = await getUserByUsername(username);
    const currentUser = await getCurrentUser();

    if (!user) {
        notFound();
    }

    return (
        <>
            <Header variant="title" title={`@${user.username}`} />
            <UserBanner/>
            <UserDetails 
                user={user} 
                currentUser={currentUser} />
            <ProfileTabs
                user={user}
                currentUser={currentUser}
            />
        </>
    );
}

