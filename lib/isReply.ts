import { PostWithAuthor, RepliesWithParent } from "@/types/post";

export function isReply(post: PostWithAuthor | RepliesWithParent): post is RepliesWithParent {
    if (!post) return false;
    return "parent" in post;
}
