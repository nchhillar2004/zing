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
