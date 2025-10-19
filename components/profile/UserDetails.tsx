import { CurrentUser, UserWithCounts } from "@/interfaces/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BadgeCheck, BadgeDollarSign, Users, UserPlus, MessageCircle, MapPin, CalendarDays, Ellipsis, Link as LinkIcon, Ban, Flag, Edit, TriangleAlert, Lock } from "lucide-react";
import { formatDate } from "@/utils/time";
import { P, Muted } from "../ui/typography";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";

export default function UserDetails({user, currentUser}: {user: UserWithCounts, currentUser: CurrentUser | null}) {
    return(
        <div>
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between flex-shrink-0">
                        <Avatar className="w-24 h-24 -mt-16 border-6 select-none border-background">
                            <AvatarImage
                                src="https://github.com/evilrabbi.png"
                                alt={`@${user.username}`}
                            />
                            <AvatarFallback className="text-2xl">
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {currentUser && currentUser.id===user.id ?
                            <div className="flex items-center">
                                {currentUser && (!currentUser.bio || !currentUser.dob || !currentUser.email) && 
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
                                        <DropdownMenuItem><Button variant="ghost" size="sm"><LinkIcon/> Copy profile link</Button></DropdownMenuItem>
                                        <DropdownMenuItem><Button variant="ghost" size="sm"><Ban/> Block @{user.username}</Button></DropdownMenuItem>
                                        <DropdownMenuItem><Button variant="ghost" size="sm"><Flag/> Report @{user.username}</Button></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {user.accountPrivacy==="PUBLIC" ?
                                    <Button variant="outline" size="sm">
                                        <UserPlus className="mr-2" size={16} />
                                        Follow
                                    </Button>
                                    : <Button variant={"outline"} size={"sm"}>
                                        <UserPlus className="my-2" size={16} />
                                        Request
                                    </Button>
                                }
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
                                    ) : (<>{currentUser && currentUser.id===user.id && 
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
                                    <P className="text-sm max-w-[70%] mt-2">{user.bio}</P>
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

                        {user.accountPrivacy==="PUBLIC" || (currentUser && currentUser.id===user.id) ?
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
                        {currentUser && !(currentUser.id===user.id) && user.isSpam && 
                            <P className="text-[12px] border border-border px-2 rounded-sm w-fit flex items-center bg-[var(--warning)] max-md:hidden">
                                <TriangleAlert size={12} className="mr-1" /> This profile is marked as spam!
                            </P>}
                    </div>
                </div>
            </div>
        </div>
    );
}
