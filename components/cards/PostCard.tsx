"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { P, Muted } from "../ui/typography";
import { Bookmark, ChartNoAxesColumn, Heart, MessageCircle, Repeat } from "lucide-react";
import { redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { formatRelativeTime } from "@/utils/time";
import UserAvatar from "../common/UserAvatar";
import { formatNumber } from "@/utils/number";
import { Post, User } from "@prisma/client";
import { LikeType } from "../common/PostView";
import { isPostLiked } from "@/lib/api/post/likePost";
import { likePost } from "@/lib/api/post/likePost";
import { toast } from "sonner";
import Loading from "../Loading";
import { Button } from "../ui/button";

interface PostCard {
    variant: "post" | "reply";
    post: Post & {
        author: User;
        _count: {
            likes: number;
            replies: number;
            bookmarks: number;
        };
    };
}

export default function PostCard({variant, post}: PostCard) {
    const [likedPost, setLikedPost] = useState<LikeType>("UNLIKED");
    const [loading, setLoading] = useState(true);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        async function fetchLiked() {
            const res = await isPostLiked(post);
            if (res) setLikedPost("LIKED");
            setLoading(false);
        };
        fetchLiked();
    }, [post, setLikedPost]);

    const handleLike = async (post: Post) => {
        setPending(true);
        const res = await likePost(post);
        if (res && res.success) {
            setLikedPost(res.message as LikeType);
            if (res.message==="LIKED") {
                toast.success("Liked added");
            }
            else toast.success("Unliked");
        }
        else toast.error("Failed interaction");
        setPending(false);
    };

    if (loading) return <Loading/>;

    return(
        <Card key={post.id} className="hover:bg-accent/50 border-x-0 border-t-0 p-0 rounded-none transition-colors cursor-pointer"
            onClick={() => redirect(`/post/${post.id}`)}>
            {variant==="reply" && <P>reply</P>}
            <CardContent className="py-2 px-4">
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
                                <Button
                                    title={likedPost ? "Unlike" : "Like"}
                                    disabled={isPending} className="hover:bg-pink-500/20 group" variant={"ghost"} size={"icon-sm"} 
                                    onClick={() => handleLike(post)}>
                                    <Heart className={`w-4 h-4 ${likedPost && "fill-pink-500 text-pink-500"}`}/>
                                </Button>
                                <span>{formatNumber(post._count.likes)}</span>
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
