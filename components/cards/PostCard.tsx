import { Card, CardContent } from "../ui/card";
import { P, Muted } from "../ui/typography";
import { Heart, Reply, ChartNoAxesColumn } from "lucide-react";
import { redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { formatRelativeTime } from "@/utils/time";
import { PostWithAuthor, ReplyWithParent } from "@/interfaces/post";
import UserAvatar from "../common/UserAvatar";
import { formatNumber } from "@/utils/number";

interface PostCard {
    variant: "post" | "reply";
    post: PostWithAuthor | ReplyWithParent;
}

export default function PostCard({variant, post}: PostCard) {
    return(
        <Card key={post.id} className="hover:bg-accent/50 border-x-0 border-t-0 p-0 rounded-none transition-colors cursor-pointer"
            onClick={() => redirect(`/post/${post.id}`)}>
            {variant==="reply" && <P>reply</P>}
            <CardContent className="p-4">
                <div className="flex gap-3">
                    <UserAvatar user={post.author} size="sm" />
                    <div className="flex-1 space-y-2 overflow-auto">
                        <div className="flex items-center gap-2">
                            <P className="font-semibold flex items-center">
                                {post.author.name}
                                {post.author.isVerified && (
                                    <BadgeCheck className="ml-1 text-primary" strokeWidth={2} size={14} />
                                )}
                            </P>
                            <Muted className="text-sm max-sm:hidden">@{post.author.username}</Muted>
                            <Muted className="text-sm max-sm:hidden">·</Muted>
                            <Muted className="text-sm">{formatRelativeTime(post.createdAt)}</Muted>
                        </div>
                        <pre className="line-clamp-5 text-wrap wrap-break-word text-ellipsis text-sm leading-[1.2]! mt-0! tracking-[0.02em]!">
                            {post.content} 
                        </pre>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1" title="Likes">
                                <Heart className="w-4 h-4" />
                                <span>{formatNumber(post._count.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1" title="Replies">
                                <Reply className="w-4 h-4" />
                                <span>{formatNumber(post._count.replies)}</span>
                            </div>
                            <div className="flex items-center gap-1" title="Total visits">
                                <ChartNoAxesColumn className="w-4 h-4" />
                                <span>{formatNumber(post.viewCount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
