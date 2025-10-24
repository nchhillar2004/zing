import { Like, Post} from "@prisma/client";

export type AuthorLite = {
    id: string;
    name: string;
    username: string;
    profilePic: string;
    isVerified: boolean;
};

export type PostWithAuthor = Post & {
    author: AuthorLite;
    _count: {
        likes: number;
        views: number;
        replies: number;
        bookmarks: number;
    }
};

export type RepliesWithParent = PostWithAuthor & {
    parent: PostOrReply;
};

export type PostOrReply = PostWithAuthor | RepliesWithParent;

export type LikedPosts = Like & {
    post: PostOrReply;
}

