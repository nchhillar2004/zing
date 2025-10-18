import { UserWithCounts } from "@/interfaces/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BadgeCheck, BadgeDollarSign, Users, UserPlus, MessageCircle, MapPin, CalendarDays } from "lucide-react";
import { formatDate } from "@/utils/time";
import { P, Muted } from "../ui/typography";
import { Button } from "../ui/button";

export default function UserDetails({user}: {user: UserWithCounts}) {
    return(
        <div>
            <div className="p-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <Avatar className="w-24 h-24 -mt-12 border-4 border-background">
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt={`@${user.username}`}
                            />
                            <AvatarFallback className="text-2xl">
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-2xl font-bold">{user.name}</h1>
                                    {user.isVerified && (
                                        <Badge variant="default" title="Verified" className="select-none">
                                            Verified <BadgeCheck/>
                                        </Badge>
                                    )}
                                    {user.premiumTier !== 'NONE' && (
                                        <Badge variant="default" title={user.premiumTier} className="select-none">
                                            {user.premiumTier} <BadgeDollarSign/>
                                        </Badge>
                                    )}
                                </div>
                                <P className="text-muted-foreground mt-0! leading-none"><span className="select-none italic text-primary">{"@"}</span>{user.username}</P>
                                {user.bio && (
                                    <P className="mt-2">{user.bio}</P>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Follow
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">{user._count.followers}</span>
                                <Muted>Followers</Muted>
                            </div>
                            <div className="flex items-center gap-1">
                                <UserPlus className="w-4 h-4" />
                                <span className="font-medium">{user._count.follows}</span>
                                <Muted>Following</Muted>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span className="font-medium">{user._count.posts}</span>
                                <Muted>Posts</Muted>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                            {user.dob && (
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <Muted>Born {formatDate(new Date(user.dob))}</Muted>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <Muted>{user.country}</Muted>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
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
                    </div>
                </div>
            </div>
        </div>
    );
}
