"use client";
import { useState, useEffect, MouseEvent } from "react";
import { Card, CardContent } from "../ui/card";
import { P, Muted } from "../ui/typography";
import { Bookmark, ChartNoAxesColumn, Heart, MessageCircle, Repeat } from "lucide-react";
import { redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { formatRelativeTime } from "@/utils/time";
import UserAvatar from "../common/UserAvatar";
import { formatNumber } from "@/utils/number";
import { LikeType } from "../common/PostView";
import { isPostLiked } from "@/lib/api/post/likePost";
import { likePost } from "@/lib/api/post/likePost";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { isReply } from "@/lib/isReply";
import { PostOrReply } from "@/types/post";

export default function PostCard({post}: {post: PostOrReply}) {
    const [likedPost, setLikedPost] = useState<LikeType>("UNLIKED");
    const [loading, setLoading] = useState(true);
    const [isPending, setPending] = useState(false);
    const [likeCount, setLikeCount] = useState(post._count.likes);

    useEffect(() => {
        async function fetchLiked() {
            const res = await isPostLiked(post);
            if (res) setLikedPost("LIKED");
            setLoading(false);
        };
        fetchLiked();
    }, [post, setLikedPost]);

    const handleLike = async (post: PostOrReply, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setPending(true);
        const res = await likePost(post);
        if (res && res.success) {
            setLikedPost(res.message as LikeType);
            if (res.message==="LIKED") {
                setLikeCount((prev) => prev + 1);
            }
            else setLikeCount((prev) => Math.max(prev - 1, 0));
        }
        else toast.error("Failed interaction");
        setPending(false);
    };

    if (loading) return <Skeleton className="h-32 rounded-none mb-1" />;
    return(
        <Card key={post.id} className="hover:bg-accent/50 border-x-0 border-t-0 p-0 rounded-none transition-colors cursor-pointer"
            onClick={() => redirect(`/post/${post.id}`)}>
            <CardContent className="py-1 px-2">
                {isReply(post) && post.parent && <Muted className="flex space-x-1 items-center text-sm font-semibold mb-1"> 
                    <MessageCircle size={14} strokeWidth={2.8} /> 
                    <span>
                        Replied to: {post.parent.author?.username}
                    </span>
                </Muted>}
                <div className="flex gap-2">
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
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Button disabled={isPending} variant={"ghost"} className="hover:bg-pink-500/20 group" size={"icon"} 
                                    title={likedPost==="LIKED" ? "Unlike" : "Like" } 
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleLike(post, e)}>
                                    {likedPost==="LIKED" ? <Heart className="fill-pink-500 text-pink-500" />:
                                        <Heart className="group-hover:fill-pink-500 group-hover:text-pink-500" />}
                                </Button>
                                <span>{formatNumber(likeCount)}</span>
                            </div>
                            <div className="flex items-center">
                                <Button variant={"ghost"}
                                    title="Re-post"
                                    className="hover:bg-green-500/20 group" size={"icon-sm"}>
                                    <Repeat className="group-hover:fill-green-500 group-hover:text-green-500" />
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <Button 
                                    title="Reply"
                                    variant={"ghost"} className="hover:bg-blue-500/20 group" size={"icon-sm"}>
                                    <MessageCircle className="group-hover:fill-blue-500 group-hover:text-blue-500" />
                                </Button>
                                <span>{formatNumber(post._count.replies)}</span>
                            </div>
                            <div className="flex items-center">
                                <Button variant={"ghost"}
                                    title="Total visits"
                                    className="hover:bg-primary/20 group" size={"icon-sm"}>
                                    <ChartNoAxesColumn className="group-hover:fill-primary group-hover:text-primary" />
                                </Button>
                                <span>{formatNumber(post.viewCount)}</span>
                            </div> 
                            <div className="flex items-center">
                                <Button
                                    title="Bookmarks"
                                    variant={"ghost"} className="hover:bg-primary/20 group" size={"icon-sm"}>
                                    <Bookmark className="group-hover:fill-primary group-hover:text-primary" />
                                </Button>
                                <span>{formatNumber(post._count.bookmarks)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
