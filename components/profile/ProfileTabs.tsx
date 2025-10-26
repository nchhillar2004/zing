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
import { MessageCircle } from "lucide-react";
import { CurrentUser, UserWithCounts } from "@/interfaces/user";
import { getUserPosts } from "@/lib/api/user/getUserPosts";
import { getUserReplies } from "@/lib/api/user/getUserReplies";
import Loading from "@/components/common/Loading";
import { getUserLikes } from "@/lib/api/user/getUserLikes";
import { LikedPost, PostWithAuthor, RepliesWithParent } from "@/types/post";

export interface PostData {
    posts: PostWithAuthor[];
    total: number;
}

export interface RepliesData {
    replies: RepliesWithParent[];
    total: number;
}

export interface LikesData{
    likes: LikedPost[];
    total: number;
}

export default function ProfileTabs({user, currentUser}: {user: UserWithCounts, currentUser: CurrentUser | null}) {
    const [activeTab, setActiveTab] = useState("posts");
    const [posts, setPosts] = useState<PostData>();
    const [replies, setReplies] = useState<RepliesData>();
    const [likes, setLikes] = useState<LikesData>();
    const [loading, setLoading] = useState(true);

    const currentUserOwner = currentUser && currentUser.id===user.id;

    useEffect(() => {
        const fetchPosts = async () => {
            const postData: PostData = await getUserPosts(user.username);
            setPosts(postData);
        }

        const fetchReplies = async () => {
            const repliesData: RepliesData = await getUserReplies(user.username);
            setReplies(repliesData);
        }

        const fetchLikes = async () => {
            const likesData: LikesData = await getUserLikes(user.username);
            setLikes(likesData);
        }

        if (activeTab === "posts"){
            fetchPosts();
        } else if (activeTab === "replies") {
            fetchReplies();
        } else if (activeTab === "likes") {
            fetchLikes();
        }
        setLoading(false);
    }, [activeTab, user.username]);

    if (user.accountPrivacy==="PRIVATE" && (!currentUserOwner || !currentUser)) {
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
                    <TabsList className={`grid h-fit w-full ${currentUserOwner ? "grid-cols-3" : "grid-cols-2"}`}>
                        <TabsTrigger value="posts" className="py-2">
                            Posts {!(posts) ? <></> : `(${posts?.total})`}
                        </TabsTrigger>
                        <TabsTrigger value="replies">
                            Replies
                        </TabsTrigger>
                        {currentUserOwner &&
                            <TabsTrigger value="likes">
                                Likes
                            </TabsTrigger>
                        }
                    </TabsList>
                </div> 
                <TabsContent value="posts">
                    {loading ? <Loading className="h-24" /> :  
                        <>
                            {posts?.total === 0 ? (
                                <div className="text-center py-12">
                                    <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <P className="text-muted-foreground">No posts yet</P>
                                    <Small className="text-muted-foreground">When {user.name} posts, you&apos;ll see them here.</Small>
                                </div>
                            ) : (
                                    <div>
                                        {posts?.posts.map((post) => (
                                            <PostCard key={post.id} post={post} />
                                        ))}
                                        {loading && <Loading/>}
                                    </div>
                                )}
                        </>}
                </TabsContent>


                <TabsContent value="replies">
                    {loading ? <Loading className="h-24" /> : <>
                        {replies?.total === 0 ? (
                            <div className="text-center py-12">
                                <Reply className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <P className="text-muted-foreground">No replies yet</P>
                                <Small className="text-muted-foreground">When {user.name} replies to posts, you&apos;ll see them here.</Small>
                            </div>
                        ) : (
                                replies?.replies.map((reply) => (
                                    <div key={reply.id}>
                                        <PostCard post={reply.parent} isParent={true} /> 
                                        <PostCard post={reply} /> 
                                    </div>
                                ))
                            )}
                    </>}
                </TabsContent>

                {currentUserOwner && 
                    <TabsContent value="likes">
                        <Small className="text-muted-foreground">Liked posts are private to you.</Small>
                        {loading ? <Loading className="h-24" /> : <>
                            {likes?.total === 0 ? (
                                <div className="text-center py-12">
                                    <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <P className="text-muted-foreground">No liked posts</P>
                                    <Small className="text-muted-foreground">Like a posts to see them here.</Small>
                                </div>
                            ) : (
                                    likes?.likes.map((like) => (
                                        <PostCard key={like.id} post={like.post} /> 
                                    ))
                                )}
                        </>}
                    </TabsContent>
                }
            </Tabs>
        </div>
    );
}
