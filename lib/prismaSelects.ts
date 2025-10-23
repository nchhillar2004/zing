export const authorSelect = {
    id: true,
    name: true,
    username: true,
    profilePic: true,
    isVerified: true,
};

export const countSelect = {
    likes: true,
    replies: true,
    bookmarks: true,
    views: true,
};

export const postInclude = {
    author: { select: authorSelect },
    _count: { select: countSelect },
};

export const replyInclude = {
    ...postInclude,
    parent: {
        include: {
            author: { select: authorSelect },
        },
    },
};

