import { UserWithCounts } from "@/interfaces/user";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { H3, P } from "../ui/typography";
import Link from "next/link";
import { formatNumber } from "@/utils/number";

export default function MiniUserProfile({user}: {user: UserWithCounts}) {
    console.log("follows: "+formatNumber(+user._count.follows));
    return(
        <div className="border overflow-hidden border-border bg-background rounded-[var(--radius)]">
            {user ? (
                <div>
                    <div>
                        <Image
                            src={user.profileBanner ? user.profileBanner : "/banner.png"}
                            alt={"profile banner"}
                            height={120}
                            width={1440}
                            className="h-28 w-full object-cover"
                        />
                    </div>
                    <div className="px-2 h-16 flex space-x-2">
                        <Avatar className="relative -top-8 select-none">
                            <AvatarImage
                                src={user.profilePic} 
                                alt={`${user.name} profile pic`}>
                            </AvatarImage>
                            <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="py-[6px] h-fit">
                            <H3 className="leading-none"><Link href={`/user/${user.username}`}>{user.name}</Link></H3>
                            <span className="text-sm leading-none text-gray">@{user.username}</span>
                        </div>
                    </div>
                    <div className="px-2 flex space-x-2 justify-between">
                        <div>
                            <P className="text-gray">Followers</P>
                            <span className="text-lg text-primary font-semibold">{formatNumber(user._count.followers)}</span>
                        </div>
                        <div>
                            <P className="text-gray">Following</P>
                            <span className="text-lg text-primary font-semibold">{formatNumber(user._count.follows)}</span>
                        </div>
                        <div>
                            <P className="text-gray">Posts</P>
                            <span className="text-lg text-primary font-semibold">{formatNumber(user._count.posts)}</span>
                        </div>
                    </div>
                </div>
            ) : (
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full"
                        onClick={() => redirect("/login")}>
                        Login
                    </Button>
                )}
        </div>

    );
}
