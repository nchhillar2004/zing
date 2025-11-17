import { CardDescription, Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { Small, P, Muted } from "../ui/typography";
import { getUsersToFollow } from "@/lib/api/user/getUsersToFollow";
import UserAvatar from "../common/UserAvatar";
import { BadgeCheck } from "lucide-react";
import { FollowButton } from "../profile/UserActions";
import { getCurrentUser } from "@/lib/dal";

export default async function WhoToFollow() {
    const users = await getUsersToFollow(4);
    const currentUser = await getCurrentUser();

    if (users.length === 0) {
        return null;
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>Who to follow</CardTitle>
                <CardDescription>Top users to follow.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {users.map((user) => (
                        <li key={user.id} className="flex items-center justify-between gap-2">
                            <Link 
                                href={`/user/${user.username}`}
                                className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                            >
                                <UserAvatar user={user} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <P className="font-semibold text-sm flex items-center gap-1 truncate">
                                        {user.name}
                                        {user.isVerified && (
                                            <BadgeCheck className="text-primary flex-shrink-0" size={14} />
                                        )}
                                    </P>
                                    <Muted className="text-xs truncate">@{user.username}</Muted>
                                </div>
                            </Link>
                            <FollowButton 
                                userId={user.id}
                                username={user.username}
                                accountPrivacy="PUBLIC"
                                currentUserId={currentUser?.id || null}
                            />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Small><Link href={"/search"} className="text-primary">View all</Link></Small>
            </CardFooter>
        </Card>
    );
}

