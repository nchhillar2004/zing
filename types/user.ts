import { Prisma } from "@prisma/client";

export const userCountSelect = {
    posts: true,
    followers: true,
    follows: true,
} as const;

export const userWithCountsSelect = {
    id: true,
    name: true,
    username: true,
    email: true,
    bio: true,
    dob: true,
    country: true,
    isVerified: true,
    profilePic: true,
    selectedCategories: true,
    profileBanner: true,
    isSpam: true,
    role: true,
    interests: true,
    premiumTier: true,
    accountType: true,
    accountPrivacy: true,
    moderationStatus: true,
    createdAt: true,
    updatedAt: true,
    _count: { select: userCountSelect },
} as const satisfies Prisma.UserSelect;

export const currentUserSelect = {
    id: true,
    name: true,
    username: true,
    role: true,
    email: true,
    bio: true,
    dob: true,
    isVerified: true,
    profileBanner: true,
    profilePic: true,
    premiumTier: true,
    accountType: true,
    interests: true,
    professionalCategory: true,
    selectedCategories: true,
    createdAt: true,
    _count: { select: userCountSelect },
} as const satisfies Prisma.UserSelect;

export const authorLiteSelect = {
    id: true,
    name: true,
    username: true,
    bio: true,
    premiumTier: true,
    profilePic: true,
    isVerified: true,
    createdAt: true,
} as const satisfies Prisma.UserSelect;

export type UserWithCounts = Prisma.UserGetPayload<{
    select: typeof userWithCountsSelect;
}>;

export type CurrentUser = Prisma.UserGetPayload<{
    select: typeof currentUserSelect;
}>;

export type AuthorLite = Prisma.UserGetPayload<{
    select: typeof authorLiteSelect;
}>;
