"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AuthorLite } from "@/types/user";
import { formatDate } from "@/utils/time";
import React, { useEffect, useState } from "react";
import { H4 } from "../ui/typography";
import { BadgeCheck } from "lucide-react";
import { sanitizeHtml } from "@/lib/sanitize";

export function HoverProfileCard({user}: {user: AuthorLite | undefined}) {
    const [bio, setBio] = useState("");

    useEffect(() => {
        const fetchBio = async () => {
            const safeBio = await sanitizeHtml(user?.bio || "");
            setBio(safeBio);
        }
        fetchBio();
    }, [user?.bio]);

    if(!user) return;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">@{user.username}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="min-w-64 w-fit max-w-80">
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={user.profilePic} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <H4 className="flex text-nowrap leading-none items-center">{user.name}{user.isVerified && <BadgeCheck className="ml-1 text-primary" size={18} />}</H4>
                        <h4 className="text-sm font-semibold">@{user.username}</h4>
                        {user.bio ? (
                            <p
                                className="text-sm line-clamp-2 overflow-ellipsis"
                                dangerouslySetInnerHTML={{ __html: bio }}
                            />
                        ) : (
                                <p className="text-sm text-muted-foreground">User has no bio.</p>
                            )}
                        <div className="text-muted text-xs">
                            Joined: {formatDate(user.createdAt)}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

