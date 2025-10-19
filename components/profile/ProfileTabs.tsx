"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { P, Small } from "../ui/typography";
import { 
    Heart,
    Lock,
    Reply
} from "lucide-react";
import PostCard from "../cards/PostCard";
import { PostWithAuthor, ReplyWithParent } from "@/interfaces/post";
import { MessageCircle } from "lucide-react";
import { CurrentUser, UserWithCounts } from "@/interfaces/user";
import { getUserPosts } from "@/lib/api/getUserPosts";
import { getUserReplies } from "@/lib/api/getUserReplies";
import Loading from "../Loading";

interface PostData {
    posts: PostWithAuthor[];
    total: number;
}

interface RepliesData {
    replies: ReplyWithParent[];
    total: number;
}

export default function ProfileTabs({user, currentUser}: {user: UserWithCounts, currentUser: CurrentUser | null}) {
    const [activeTab, setActiveTab] = useState("posts");
    const [posts, setPosts] = useState<PostData>();
    const [replies, setReplies] = useState<RepliesData>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            const postData: PostData = await getUserPosts(user.username);
            setPosts(postData);
        }

        const fetchReplies = async () => {
            const repliesData: RepliesData = await getUserReplies(user.username);
            setReplies(repliesData);
        }

        if (activeTab === "posts"){
            fetchPosts();
            setLoading(false);
        } else if (activeTab === "replies") {
            fetchReplies();
            setLoading(false);
        } else if (activeTab === "likes") {
            setLoading(false);
        }
    }, [activeTab, user.username]);

    if (user.accountPrivacy==="PRIVATE" && (currentUser && !(currentUser.id===user.id))) {
        return(
        <div className="text-center py-12">
                <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <P className="text-muted-foreground">This account is private.</P>
            </div>
        );
    }

    return(
        <div className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="pt-2">
                    <TabsList className={`grid w-full ${currentUser && currentUser.id === user.id ? "grid-cols-3" : "grid-cols-2"}`}>
                        <TabsTrigger value="posts" className="py-2">
                            Posts {!(posts) ? <></> : `(${posts?.total})`}
                        </TabsTrigger>
                        <TabsTrigger value="replies">
                            Replies
                        </TabsTrigger>
                        {currentUser && currentUser.id===user.id &&
                            <TabsTrigger value="likes">
                                Likes
                            </TabsTrigger>
                        }
                    </TabsList>
                </div> 

                <TabsContent value="posts" className="p-6 space-y-4">
                    {loading ? <Loading/> : <>
                        {posts?.total === 0 ? (
                            <div className="text-center py-12">
                                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <P className="text-muted-foreground">No posts yet</P>
                                <Small className="text-muted-foreground">When {user.name} posts, you&apos;ll see them here.</Small>
                            </div>
                        ) : (
                                <div>
                                    {posts?.posts.map((post) => (
                                        <PostCard key={post.id} variant="post" post={post} />
                                    ))}
                                    {loading && <Loading/>}
                                </div>
                            )}
                    </>}
                </TabsContent>


                <TabsContent value="replies" className="p-6 space-y-4">
                    {loading ? <Loading/> : <>
                        {replies?.total === 0 ? (
                            <div className="text-center py-12">
                                <Reply className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <P className="text-muted-foreground">No replies yet</P>
                                <Small className="text-muted-foreground">When {user.name} replies to posts, you&apos;ll see them here.</Small>
                            </div>
                        ) : (
                                replies?.replies.map((reply) => (
                                    <PostCard key={reply.id} variant="reply" post={reply} /> 
                                ))
                            )}
                    </>}
                </TabsContent>

                {currentUser && currentUser.id===user.id && 
                    <TabsContent value="likes" className="p-6 space-y-4">
                        <Small className="text-muted-foreground">Liked posts are private to you.</Small>
                        {loading ? <Loading/> : <>
                            {replies?.total === 0 ? (
                                <div className="text-center py-12">
                                    <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <P className="text-muted-foreground">No liked posts</P>
                                    <Small className="text-muted-foreground">Like a posts to see them here.</Small>
                                </div>
                            ) : (
                                    replies?.replies.map((reply) => (
                                        <PostCard key={reply.id} variant="reply" post={reply} /> 
                                    ))
                                )}
                        </>}
                    </TabsContent>
                }
            </Tabs>
        </div>
    );
}
