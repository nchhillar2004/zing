import { Card, CardContent } from "../ui/card";
import { P, Muted } from "../ui/typography";
import { Heart, Eye, Reply } from "lucide-react";
import { redirect } from "next/navigation";
import { Badge } from "../ui/badge";
import { formatRelativeTime } from "@/utils/time";
import { PostWithAuthor, ReplyWithParent } from "@/interfaces/post";
import UserAvatar from "../common/UserAvatar";

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
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <P className="font-medium">{post.author.name}</P>
                            {post.author.isVerified && (
                                <Badge variant="secondary">
                                    ✓
                                </Badge>
                            )}
                            <Muted className="text-sm">@{post.author.username}</Muted>
                            <Muted className="text-sm">·</Muted>
                            <Muted className="text-sm">{formatRelativeTime(post.createdAt)}</Muted>
                        </div>
                        <P>{post.content} 
                            hello here is some sample content to test how the post responsds when the content overflows. this content certainly overflows one line
                            i want it to be eclipessed after 4th line. and i am still at third line. do not waste your time reading this. its just to increadse the post content. i guess its 5 lines now bye bye see you.
                        </P>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{post._count.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Reply className="w-4 h-4" />
                                <span>{post._count.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{post.viewCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
