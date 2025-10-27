"use client";
import UserAvatar from "./UserAvatar";
import { H4, Muted } from "../ui/typography";
import Link from "next/link";
import { BadgeCheck, Bookmark, ChartNoAxesColumn, Ellipsis, Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { formatNumber } from "@/utils/number";
import { isPostLiked, likePost } from "@/lib/api/post/likePost";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import PostCard from "../cards/PostCard";
import { isReply } from "@/lib/isReply";
import { PostOrReply } from "@/types/post";
import { P } from "../ui/typography";
import { bookmarkPost, isPostBookmarked } from "@/lib/api/post/bookmarkPost";
import { HoverProfileCard } from "../cards/HoverProfileCard";

export type LikeType = "LIKED" | "UNLIKED" ;
export type BookType = "BOOK" | "UNBOOK" ;

export default function PostView({post}: {post: PostOrReply}) {
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

    const handleLike = async (post: PostOrReply) => {
        setPending(true);
        const res = await likePost(post);
        if (res && res.success) {
            setLikedPost(res.message as LikeType);
            if (res.message==="LIKED") {
                setLikeCount((prev: number) => prev + 1);
            }
            else {
                setLikeCount((prev: number) => Math.max(prev - 1, 0));
            }
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

    if (loading) return <Loading/>;

    return(
        <>
            {isReply(post) && post.parent && 
                <div className="relative h-fit">
                    {isReply(post.parent) && post.parent.parent && <PostCard post={post.parent.parent} isParent={true} />}
                    <PostCard post={post.parent} isParent={true} />
                </div>
            }
            <div className="py-2 px-4 max-md:px-0 space-y-2 border-b border-border">
                {isReply(post) && post.parent && <P className="flex space-x-1 items-center text-sm mb-1 pl-14">
                    <span>Replied to</span><Link href={`/user/${post.parent.author.username}`}>
                        <HoverProfileCard user={post.parent.author}/>
                    </Link>
                </P>
                }
                <div className="flex justify-between space-x-2">
                    <div className="flex space-x-2">
                        <UserAvatar user={post.author} size="md" />
                        <div>
                            <H4>
                                <Link href={`/user/${post.author.username}`} className="flex text-nowrap items-center">
                                    {post.author.name}{post.author.isVerified && <BadgeCheck className="ml-2 text-primary" strokeWidth={2.5} size={20} />}
                                </Link>
                            </H4>
                            <Muted className="text-sm leading-2.5!">
                                {"@"}{post.author.username}
                            </Muted>
                        </div>
                    </div>
                    <div>
                        <Button variant={"ghost"} className="hover:bg-dark-background" size={"icon"}>
                            <Ellipsis/>
                        </Button>
                    </div>
                </div>
                <pre className="py-2 text-wrap wrap-break-word font-arial tracking-wide">
                    {post.content}
                </pre>
                <Separator orientation="horizontal" />
                <div className="flex items-center justify-between space-x-2 max-sm:overflow-x-scroll">
                    <div className="flex items-center space-x-[2px]">
                        <Button disabled={isPending} variant={"ghost"} className="hover:bg-pink-500/20 group" 
                            size={"icon"} title={likedPost==="LIKED" ? "Unlike" : "Like" } onClick={() => handleLike(post)}>
                            {likedPost==="LIKED" ? <Heart className="fill-pink-500 text-pink-500" />:
                                <Heart className="group-hover:fill-pink-500 group-hover:text-pink-500" />}
                        </Button>
                        <Muted>{formatNumber(likeCount)}</Muted>
                    </div>
                    <div className="flex items-center">
                        <Button variant={"ghost"} className="hover:bg-green-500/20 group" size={"icon"} title="Re-post">
                            <Repeat className="group-hover:fill-green-500 group-hover:text-green-500" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-[2px]">
                        <Button variant={"ghost"} className="hover:bg-blue-500/20 group" size={"icon"} title="Reply">
                            <MessageCircle className="group-hover:fill-blue-500 group-hover:text-blue-500" />
                        </Button>
                        <Muted>{formatNumber(post._count.replies)}</Muted>
                    </div>
                    <div className="flex items-center space-x-[2px]">
                        <Button variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} title="Total visits">
                            <ChartNoAxesColumn className="group-hover:text-primary" />
                        </Button>
                        <Muted>{formatNumber(post.viewCount)}</Muted>
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
                    <div className="flex items-center">
                        <Button variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} title="Share">
                            <Share className="group-hover:text-primary" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
