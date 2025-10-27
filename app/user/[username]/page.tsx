import { notFound, redirect } from "next/navigation";
import { getUserByUsername } from "@/lib/api/user/getUserByUsername";
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
        redirect("/");
    }

    return (
        <>
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

