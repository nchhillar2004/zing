export interface UserCounts {
    posts: number;
    followers: number;
    follows: number;
}

export interface UserBase {
    id: string;
    name: string;
    username: string;
    email?: string | null;
    bio?: string | null;
    dob?: string | null;
    country?: string;
    profilePic: string;
    profileBanner?: string;
    isVerified: boolean;
    isSpam?: boolean;
    role?: string;
    premiumTier?: string;
    accountType?: string;
    accountPrivacy?: string;
    moderationStatus?: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface UserWithCounts extends UserBase {
    _count: UserCounts;
}

export interface CurrentUser {
    id: string;
    name: string;
    username: string;
    profilePic: string;
    profileBanner: string;
    email?: string | null;
    bio?: string | null;
    dob?: string | null;
    isVerified: boolean;
    premiumTier?: string;
    accountType?: string;
    createdAt: Date;
}
