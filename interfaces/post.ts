export interface PostWithAuthor {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    parentId: string | null;
    likeCount: number;
    replyCount: number;
    viewCount: number;
    validViewCount: number;
    postType: string;
    author: {
        id: string;
        name: string;
        username: string;
        profilePic: string;
        isVerified: boolean;
    };
    _count: {
        likes: number;
        replies: number;
        bookmarks: number;
        views: number;
    };
}

export interface ReplyWithParent extends PostWithAuthor {
    parent: {
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
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
            profilePic: string;
            isVerified: boolean;
        };
    } | null;
}
