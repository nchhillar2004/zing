import { PostWithAuthor } from "@/interfaces/post";
import UserAvatar from "./UserAvatar";
import { H4, Muted } from "../ui/typography";
import Link from "next/link";
import { BadgeCheck, Bookmark, Ellipsis, Eye, Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function PostView({post}: {post: PostWithAuthor}) {
    return(
        <div className="py-2 px-4 space-y-2 border-b border-border">
            <div className="flex justify-between space-x-2">
                <div className="flex space-x-2">
                    <UserAvatar user={post.author} size="sm" />
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
                    <Button variant={"ghost"} className="hover:bg-accent/50" size={"icon"}>
                        <Ellipsis/>
                    </Button>
                </div>
            </div>
            <pre className="py-2 text-wrap wrap-break-word">
                {post.content}
            </pre>
            <Separator orientation="horizontal" />
            <div className="flex items-center justify-between space-x-2 max-sm:overflow-x-scroll">
                <div className="flex items-center space-x-[2px]">
                    <Button variant={"ghost"} className="hover:bg-pink-500/20 group" size={"icon"} title="Like">
                        <Heart className="group-hover:fill-pink-500 group-hover:text-pink-500" />
                    </Button>
                    <Muted>{post.likeCount}</Muted>
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
                    <Muted>{post.replyCount}</Muted>
                </div>
                <div className="flex items-center space-x-[2px]">
                    <Button variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} title="Views">
                        <Eye className="group-hover:text-primary" />
                    </Button>
                    <Muted>{post.viewCount}</Muted>
                </div>
                <div className="flex items-center">
                    <Button variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} title="Bookmark">
                        <Bookmark className="group-hover:fill-primary group-hover:text-primary" />
                    </Button>
                </div>
                <div className="flex items-center">
                    <Button variant={"ghost"} className="hover:bg-primary/20 group" size={"icon"} title="Share">
                        <Share className="group-hover:text-primary" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
