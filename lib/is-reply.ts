import { PostOrReply, PostWithParent } from "@/types/post";

export function isReply(post: PostOrReply): post is PostWithParent {
    if (!post) return false;
    return "parent" in post && post.parent !== null;
}
