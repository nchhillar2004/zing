"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { P, Small, Muted } from "./ui/typography";
import { 
    CalendarDays, 
    MapPin, 
    Users, 
    UserPlus, 
    Heart,
    BadgeCheck,
    BadgeDollarSign,
    Eye,
    Reply
} from "lucide-react";
import { MessageCircle } from "lucide-react";

interface UserWithCounts {
    id: string;
    name: string;
    username: string;
    email: string | null;
    bio: string | null;
    dob: string | null;
    country: string;
    isVerified: boolean;
    isSpam: boolean;
    role: string;
    premiumTier: string;
    accountType: string;
    moderationStatus: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        posts: number;
        followers: number;
        follows: number;
    };
}

interface PostWithAuthor {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    time: string | null;
    authorId: string;
    parentId: string | null;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    postType: string;
    author: {
        id: string;
        name: string;
        username: string;
        isVerified: boolean;
    };
    _count: {
        likes: number;
        replies: number;
    };
}

interface ReplyWithParent extends PostWithAuthor {
    parent: {
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        time: string | null;
        authorId: string;
        parentId: string | null;
        likeCount: number;
        replyCount: number;
        viewCount: number;
        postType: string;
        author: {
            id: string;
            name: string;
            username: string;
            isVerified: boolean;
        };
    } | null;
}

interface ProfilePageClientProps {
    user: UserWithCounts;
    posts: PostWithAuthor[];
    replies: ReplyWithParent[];
    postsTotal: number;
    repliesTotal: number;
}

export default function ProfilePageClient({ 
    user, 
    posts, 
    replies, 
    postsTotal, 
    repliesTotal 
}: ProfilePageClientProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("posts");

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    };

    const formatRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
        return formatDate(date);
    };


    return (
        <div>
            <div className="relative h-32 bg-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-primary/60 select-none">
                        <P className="text-lg font-medium">Profile Banner</P>
                        <Small className="text-primary/40">No banner image set</Small>
                    </div>
                </div>
            </div>

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

            <div>
                <div className="p-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <div className="pt-2">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="posts" className="py-2">
                                    Posts ({postsTotal})
                                </TabsTrigger>
                                <TabsTrigger value="replies">
                                    Replies ({repliesTotal})
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="posts" className="p-6 space-y-4">
                            {posts.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <P className="text-muted-foreground">No posts yet</P>
                                    <Small className="text-muted-foreground">When {user.name} posts, you&apos;ll see them here.</Small>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <Card key={post.id} className="hover:bg-accent/50 transition-colors cursor-pointer"
                                          onClick={() => router.push(`/post/${post.id}`)}>
                                        <CardContent className="p-4">
                                            <div className="flex gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage
                                                        src="https://github.com/evilrabbit.png"
                                                        alt={`@${post.author.username}`}
                                                    />
                                                    <AvatarFallback>
                                                        {post.author.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
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
                                                    <P>{post.content}</P>
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
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="replies" className="p-6 space-y-4">
                            {replies.length === 0 ? (
                                <div className="text-center py-12">
                                    <Reply className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <P className="text-muted-foreground">No replies yet</P>
                                    <Small className="text-muted-foreground">When {user.name} replies to posts, you&apos;ll see them here.</Small>
                                </div>
                            ) : (
                                replies.map((reply) => (
                                    <Card key={reply.id} className="hover:bg-accent/50 transition-colors cursor-pointer"
                                          onClick={() => router.push(`/post/${reply.id}`)}>
                                        <CardContent className="p-4">
                                            <div className="space-y-4">
                                                {reply.parent && (
                                                    <div className="bg-muted/30 rounded-lg p-3 border-l-4 border-primary/30">
                                                        <div className="flex gap-2 mb-2">
                                                            <Avatar className="w-6 h-6">
                                                                <AvatarImage
                                                                    src="https://github.com/evilrabbit.png"
                                                                    alt={`@${reply.parent.author.username}`}
                                                                />
                                                                <AvatarFallback className="text-xs">
                                                                    {reply.parent.author.name.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex items-center gap-1">
                                                                <P className="text-sm font-medium">{reply.parent.author.name}</P>
                                                                {reply.parent.author.isVerified && (
                                                                    <Badge variant="secondary">
                                                                        ✓
                                                                    </Badge>
                                                                )}
                                                                <Muted className="text-xs">@{reply.parent.author.username}</Muted>
                                                            </div>
                                                        </div>
                                                        <P className="text-sm text-muted-foreground">{reply.parent.content}</P>
                                                    </div>
                                                )}

                                                <div className="flex gap-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage
                                                            src="https://github.com/evilrabbit.png"
                                                            alt={`@${reply.author.username}`}
                                                        />
                                                        <AvatarFallback>
                                                            {reply.author.name.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <P className="font-medium">{reply.author.name}</P>
                                                            {reply.author.isVerified && (
                                                                <Badge variant="secondary">
                                                                    ✓
                                                                </Badge>
                                                            )}
                                                            <Muted className="text-sm">@{reply.author.username}</Muted>
                                                            <Muted className="text-sm">·</Muted>
                                                            <Muted className="text-sm">{formatRelativeTime(reply.createdAt)}</Muted>
                                                        </div>
                                                        <P>{reply.content}</P>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Heart className="w-4 h-4" />
                                                                <span>{reply._count.likes}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Reply className="w-4 h-4" />
                                                                <span>{reply._count.replies}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="w-4 h-4" />
                                                                <span>{reply.viewCount}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
