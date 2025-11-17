import { CurrentUser, UserWithCounts } from "@/types/user";
import { Badge } from "../ui/badge";
import { BadgeCheck, BadgeDollarSign, Users, UserPlus, MessageCircle, MapPin, CalendarDays, Ellipsis, Flag, Edit, TriangleAlert, Lock } from "lucide-react";
import { formatDate } from "@/utils/time";
import { P, Muted } from "../ui/typography";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import UserAvatar from "../common/UserAvatar";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";
import { FollowButton, BlockButton, CopyProfileLinkButton } from "./UserActions";

export default async function UserDetails({user, currentUser}: {user: UserWithCounts, currentUser: CurrentUser | null}) {
    const currentUserOwner = currentUser && currentUser.id===user.id;
    const safeBio = await sanitizeHtml(user.bio || "");
    return(
        <div>
            <Image src={user.profileBanner ? user.profileBanner : "/banner.png"} alt="Profile banner" height={190} width={1440} className="h-52 w-auto object-cover" />
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="relative h-12 flex justify-between flex-shrink-0">
                        <UserAvatar user={user} size="lg" />
                        {currentUserOwner ?
                            <div className="flex items-center">
                                {!currentUser.dob || !currentUser.email && 
                                    <P className="text-[12px] border border-border px-2 rounded-sm mx-2 w-fit flex items-center bg-[var(--warning)] max-md:hidden">
                                        <TriangleAlert size={12} className="mr-1" /> Complete your profile
                                    </P>}
                                <Link href="/user/settings">
                                    <Button variant={"outline"} size={"sm"}>
                                        <Edit className="mr-2" size={16} />
                                        Edit profile
                                    </Button>
                                </Link>
                            </div> :
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon-sm"><Ellipsis/></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="p-0">
                                        <DropdownMenuItem asChild>
                                            <CopyProfileLinkButton username={user.username} />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <BlockButton 
                                                userId={user.id} 
                                                username={user.username}
                                                currentUserId={currentUser?.id || null}
                                            />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button variant="ghost" size="sm">
                                                <Flag className="mr-2" size={16} />
                                                Report @{user.username}
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FollowButton 
                                    userId={user.id}
                                    username={user.username}
                                    accountPrivacy={user.accountPrivacy}
                                    currentUserId={currentUser?.id || null}
                                />
                            </div>
                        }
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-2xl font-bold">{user.name}</h1>
                                    {user.isVerified ? (
                                        <Badge variant="default" title="Verified" className="select-none">
                                            Verified <BadgeCheck/>
                                        </Badge>
                                    ) : (<>{currentUserOwner && 
                                            <Button variant={"outline"} size={"sm"} className="text-[13px]">
                                                Get verified <BadgeCheck className="text-primary" size={10}/>
                                            </Button>}</>)
                                    }
                                    {user.premiumTier !== 'NONE' && (
                                        <Badge variant="default" title={user.premiumTier} className="select-none">
                                            {user.premiumTier} <BadgeDollarSign/>
                                        </Badge>
                                    )}
                                </div>
                                <P className="text-muted-foreground mt-0! leading-none p-0">
                                    <span className="select-none italic text-primary">{"@"}</span>{user.username}
                                </P>
                                {user.bio && (
                                    <p className="text-sm max-w-[70%] mt-2" dangerouslySetInnerHTML={{ __html: safeBio }} />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Users size={16} />
                                <span className="font-medium">{user._count.followers}</span>
                                <Muted>Followers</Muted>
                            </div>
                            <div className="flex items-center gap-1">
                                <UserPlus size={16} />
                                <span className="font-medium">{user._count.follows}</span>
                                <Muted>Following</Muted>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle size={16} />
                                <span className="font-medium">{user._count.posts}</span>
                                <Muted>Posts</Muted>
                            </div>
                        </div>

                        {user.accountPrivacy==="PUBLIC" || currentUserOwner ?
                            <>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {user.dob && (
                                        <div className="flex items-center gap-1">
                                            <CalendarDays size={16} />
                                            <Muted>Born {formatDate(new Date(user.dob))}</Muted>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <Muted>{user.country}</Muted>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays size={16} />
                                        <Muted>Joined {formatDate(user.createdAt)}</Muted>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Badge variant="outline">
                                        {user.accountType}
                                    </Badge>
                                    {user.role !== 'USER' && (
                                        <Badge variant="outline">
                                            {user.role}
                                        </Badge>
                                    )}
                                </div>
                            </> : 
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex font-semibold items-center gap-1">
                                    <Lock size={16} />
                                    <p>Private account</p>
                                </div>
                            </div>
                        }
                        {!currentUserOwner && user.isSpam && 
                            <P className="text-[12px] border border-border px-2 rounded-sm w-fit flex items-center bg-[var(--warning)] max-md:hidden">
                                <TriangleAlert size={12} className="mr-1" /> This profile is marked as spam!
                            </P>}
                    </div>
                </div>
            </div>
        </div>
    );
}
