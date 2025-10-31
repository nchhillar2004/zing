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
import { BookType, LikeType } from "../common/PostView";
import { isPostLiked } from "@/lib/api/post/likePost";
import { likePost } from "@/lib/api/post/likePost";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { isReply } from "@/lib/isReply";
import { PostOrReply } from "@/types/post";
import Link from "next/link";
import { bookmarkPost, isPostBookmarked } from "@/lib/api/post/bookmarkPost";
import { HoverProfileCard } from "./HoverProfileCard";
import FormatPost from "@/components/common/FormatPost";

export default function PostCard({post, isParent}: {post: PostOrReply, isParent?: boolean}) {
    const [likedPost, setLikedPost] = useState<LikeType>("UNLIKED");
    const [bookedPost, setBookedPost] = useState<BookType>("UNBOOK");
    const [loading, setLoading] = useState(true);
    const [isPending, setPending] = useState(false);
    const [likeCount, setLikeCount] = useState(post._count.likes);
    const [bookCount, setBookCount] = useState(post._count.bookmarks);

    useEffect(() => {
        async function fetchLiked() {
            const res = await isPostLiked(post);
            if (res) setLikedPost("LIKED");
            setLoading(false);
        };
        async function fetchBooked() {
            const res = await isPostBookmarked(post);
            if (res) setBookedPost("BOOK");
            setLoading(false);
        };
        fetchLiked();
        fetchBooked();
    }, [post, setLikedPost, setBookedPost]);

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

    const handleBookmark = async (post: PostOrReply, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setPending(true);
        const res = await bookmarkPost(post);
        if (res && res.success) {
            setBookedPost(res.message as BookType);
            if (res.message==="BOOK") {
                setBookCount((prev) => prev + 1);
            }
            else setBookCount((prev) => Math.max(prev - 1, 0));
        }
        else toast.error("Failed interaction");
        setPending(false);
    };

    if (loading) return <Skeleton />;
    return(
        <>
            <Card key={post.id} className={`hover:bg-dark-background border-x-0 border-t-0 p-0 rounded-none transition-colors cursor-pointer ${isParent && "relative border-b-0"}`}
                onClick={() => redirect(`/post/${post.id}`)}>
                <CardContent className="py-1 px-2 max-md:px-0">
                    <div className="flex gap-2">
                        <div className="relative">
                            <UserAvatar user={post.author} size="sm" />
                            {isParent && <div className="absolute w-[2px] left-1/2 h-full min-h-10 bg-border"></div>}
                        </div>
                        <div className="flex-1 space-y-2 overflow-auto">
                            <div className="flex items-center space-x-2 flex-wrap">
                                <P className="font-semibold flex items-center text-nowrap">
                                    {post.author.name}
                                    {post.author.isVerified && (
                                        <BadgeCheck className="ml-1 text-primary" strokeWidth={2} size={14} />
                                    )}
                                </P>
                                <Muted className="text-sm max-sm:hidden"><HoverProfileCard user={post.author} /></Muted>
                                <Muted className="text-sm max-sm:hidden">·</Muted>
                                <Muted className="text-sm">{formatRelativeTime(post.createdAt)}</Muted>
                                {isReply(post) && post.parent && <Muted className={`flex space-x-1 items-center text-sm`}> 
                                    <span>
                                        Replied to
                                    </span>
                                    <Link href={`/user/${post.parent.author.username}`}><HoverProfileCard user={post.parent.author} /></Link>
                                </Muted>}

                            </div>
                            <pre
                                onSelect={(e) => e.stopPropagation()}
                                className="line-clamp-[10] font-arial text-wrap select-text wrap-break-word text-ellipsis text-sm leading-[1.2]! mt-0! tracking-wide">
                                <FormatPost content={post.content} />
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
                                    <Button disabled={isPending} variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} 
                                        title={bookedPost==="BOOK" ? "Remove bookmark" : "Add bookmark" } 
                                        onClick={(e: MouseEvent<HTMLButtonElement>) => handleBookmark(post, e)}>
                                        {bookedPost==="BOOK" ? <Bookmark className="fill-primary text-primary" />:
                                            <Bookmark className="group-hover:fill-primary group-hover:text-primary" />}
                                    </Button>
                                    <span>{formatNumber(bookCount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
