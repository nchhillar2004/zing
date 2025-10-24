import { PostWithAuthor, RepliesWithParent } from "@/types/post";

export function isReply(post: PostWithAuthor | RepliesWithParent): post is RepliesWithParent {
    return "parent" in post;
}
