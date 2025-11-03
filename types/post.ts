import { Prisma } from "@prisma/client";

// Author fields used consistently across all post queries
export const authorSelect = {
    id: true,
    name: true,
    username: true,
    bio: true,
    profilePic: true,
    premiumTier: true,
    isVerified: true,
    createdAt: true,
} as const satisfies Prisma.UserSelect;

// Count fields used consistently across all post queries
export const postCountSelect = {
    likes: true,
    views: true,
    replies: true,
    bookmarks: true,
} as const;

// Post include shape for posts with author and counts
export const postInclude = {
    author: {
        select: authorSelect,
    },
    _count: {
        select: postCountSelect,
    },
} as const satisfies Prisma.PostInclude;

// Post include shape for replies that may have a parent
export const replyInclude = {
    author: {
        select: authorSelect,
    },
    _count: {
        select: postCountSelect,
    },
    parent: {
        include: {
            parent: {
                include: {
                    author: {
                        select: authorSelect,
                    },
                    _count: {
                        select: postCountSelect,
                    },
                },
            },
            author: {
                select: authorSelect,
            },
            _count: {
                select: postCountSelect,
            },
        },
    },
} as const satisfies Prisma.PostInclude;

// Types derived from Prisma queries - these will automatically match your queries
export type PostWithAuthor = Prisma.PostGetPayload<{
    include: typeof postInclude;
}>;

export type PostWithParent = Prisma.PostGetPayload<{
    include: typeof replyInclude;
}>;

// PostOrReply can be either a regular post or a reply with parent
export type PostOrReply = PostWithAuthor | PostWithParent;

// Type guard to check if a post is a reply
export function isReply(post: PostOrReply): post is PostWithParent {
    return "parent" in post && post.parent !== null;
}

// Relation types derived from Prisma
export type BookmarkedPost = Prisma.BookmarkGetPayload<{
    include: {
        post: {
            include: typeof replyInclude;
        };
    };
}>;

export type LikedPost = Prisma.LikeGetPayload<{
    include: {
        post: {
            include: typeof replyInclude;
        };
    };
}>;

export type TaggedPost = Prisma.PostTagGetPayload<{
    include: {
        post: {
            include: typeof replyInclude;
        };
    };
}>;

// Data wrapper types
export interface BookmarksData {
    bookmarks: BookmarkedPost[];
    total: number;
}

export interface TaggedPostsData {
    taggedPosts: TaggedPost[];
    total: number;
}

export interface LikesData {
    likes: LikedPost[];
    total: number;
}
