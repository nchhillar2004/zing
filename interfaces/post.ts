export interface PostWithAuthor {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    time: string | null;
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
        isVerified: boolean;
    };
    _count: {
        likes: number;
        replies: number;
    };
}

export interface ReplyWithParent extends PostWithAuthor {
    parent: {
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        time: string | null;
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
            isVerified: boolean;
        };
    } | null;
}
