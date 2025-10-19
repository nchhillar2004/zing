export interface UserWithCounts {
    id: string;
    name: string;
    username: string;
    email: string | null;
    bio: string | null;
    dob: string | null;
    country: string;
    isVerified: boolean;
    isSpam: boolean;
    role: string;
    premiumTier: string;
    accountPrivacy: string;
    accountType: string;
    moderationStatus: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        posts: number;
        followers: number;
        follows: number;
    };
}

export interface CurrentUser {
    id: string;
    name: string;
    username: string;
    email: string | null;
    bio: string | null;
    dob: string | null;
    isVerified: boolean;
    premiumTier: string;
    accountType: string;
    createdAt: string;
}
