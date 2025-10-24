"use client";
import { useEffect, useState } from "react";
import { PostOrReply } from "@/types/post";
import { RepliesData } from "../profile/ProfileTabs";
import { fetchRepliesByParent } from "@/lib/api/user/fetchRepliesByParent";
import { Reply } from "lucide-react";
import { P, Small } from "../ui/typography";
import PostCard from "../cards/PostCard";
import Loading from "../Loading";

export default function LoadReplies({post}: {post: PostOrReply}) {
    const [replies, setReplies] = useState<RepliesData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReplies = async () => {
            const repliesData: RepliesData = await fetchRepliesByParent(post.id);
            setReplies(repliesData);
            setLoading(false);
        }
        fetchReplies();
    }, [post.id, setReplies]);

    if (loading) return(<Loading/>);

    return(
        <div>
            {replies?.total === 0 ? (
                <div className="text-center py-12">
                    <Reply className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <P className="text-muted-foreground">No replies yet</P>
                    <Small className="text-muted-foreground">Be the first to reply to this post.</Small>
                </div>
            ) : (
                    replies?.replies.map((reply) => (
                        <PostCard key={reply.id} post={reply} /> 
                    ))
                )}
        </div>
    );
}
