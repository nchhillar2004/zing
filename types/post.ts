import { Like, Post, User } from "@prisma/client";

export type PostWithAuthor = Post & {
    author: User;
    _count: {
        likes: number;
        views: number;
        replies: number;
        bookmarks: number;
    }
};

export type RepliesWithParent = PostWithAuthor & {
    parent: PostWithAuthor;
};

export type PostOrReply = PostWithAuthor | RepliesWithParent;

export type LikedPosts = Like & {
    post: PostOrReply;
}

