import { Bookmark, Like, Post} from "@prisma/client";

export type BookmarkedPost = Bookmark & {
    post: PostOrReply;
}

export interface BookmarksData{
    bookmarks: BookmarkedPost[];
    total: number;
}

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

export type LikedPost = Like & {
    post: PostOrReply;
}
