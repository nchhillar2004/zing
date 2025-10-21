export interface UserWithCounts {
    id: string;
    name: string;
    username: string;
    email: string | null;
    bio: string | null;
    dob: string | null;
    country: string;
    profilePic: string;
    isVerified: boolean;
    isSpam: boolean;
    role: string;
    premiumTier: string;
    accountType: string;
    accountPrivacy: string;
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
    profilePic: string;
    email: string | null;
    bio: string | null;
    dob: string | null;
    isVerified: boolean;
    premiumTier: string;
    accountType: string;
    createdAt: Date;
}
