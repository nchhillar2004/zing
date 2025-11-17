// Data Transfer Object for User
// Safely parse and validate user data before sending it to the client
import { z } from "zod";
import { UserRole, PremiumTier, AccountType, AccountPrivacy, ModerationStatus, Category } from "@prisma/client";
import { UserWithCounts, CurrentUser, AuthorLite } from "@/types/user";
import "server-only";

// Base user count schema
const UserCountSchema = z.object({
  posts: z.number().int().min(0),
  followers: z.number().int().min(0),
  follows: z.number().int().min(0),
});

// Helper schema for URL or default string
const urlOrStringSchema = z.union([
  z.string().url(),
  z.string().min(1), // Allow non-URL strings (like default profile pics)
]);

// Author Lite DTO - Minimal user info for post authors
export const AuthorLiteDTOSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  username: z.string().min(3).max(16),
  bio: z.string().nullable(),
  premiumTier: z.nativeEnum(PremiumTier),
  profilePic: urlOrStringSchema,
  isVerified: z.boolean(),
  createdAt: z.date(),
});

export type AuthorLiteDTO = z.infer<typeof AuthorLiteDTOSchema>;

// Public User DTO - Safe user data for public viewing
export const PublicUserDTOSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  username: z.string().min(3).max(16),
  bio: z.string().nullable(),
  dob: z.string().nullable(),
  country: z.string(),
  profilePic: urlOrStringSchema,
  profileBanner: urlOrStringSchema.nullable(),
  isVerified: z.boolean(),
  premiumTier: z.nativeEnum(PremiumTier),
  accountType: z.nativeEnum(AccountType),
  accountPrivacy: z.nativeEnum(AccountPrivacy),
  role: z.nativeEnum(UserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: UserCountSchema,
  // Only include email if viewer has permission (handled separately)
  email: z.string().email().optional(),
  // Only include sensitive fields if viewer has permission
  isSpam: z.boolean().optional(),
  moderationStatus: z.nativeEnum(ModerationStatus).optional(),
  selectedCategories: z.array(z.nativeEnum(Category)).optional(),
  interests: z.array(z.any()).optional(), // UserInterest[] - simplified for DTO
});

export type PublicUserDTO = z.infer<typeof PublicUserDTOSchema>;

// Current User DTO - Full user data for the authenticated user
export const CurrentUserDTOSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  username: z.string().min(3).max(16),
  role: z.nativeEnum(UserRole),
  email: z.string().email().nullable(),
  bio: z.string().nullable(),
  dob: z.string().nullable(),
  isVerified: z.boolean(),
  profileBanner: urlOrStringSchema.nullable(),
  profilePic: urlOrStringSchema,
  premiumTier: z.nativeEnum(PremiumTier),
  accountType: z.nativeEnum(AccountType),
  interests: z.array(z.any()),
  professionalCategory: z.nativeEnum(Category).nullable(),
  selectedCategories: z.array(z.nativeEnum(Category)),
  createdAt: z.date(),
  _count: UserCountSchema,
});

export type CurrentUserDTO = z.infer<typeof CurrentUserDTOSchema>;

// Permission helpers
export function isOwner(user: { id: string }, currentUser: { id: string } | null): boolean {
  return currentUser?.id === user.id;
}

export function isAdmin(user: { role: UserRole } | null): boolean {
  return user?.role === UserRole.ADMIN;
}

export function canSeeEmailAddress(viewer: { role: UserRole } | null, targetUser: { id: string }, currentUser: { id: string; role: UserRole } | null): boolean {
  // Admin can see any email
  if (isAdmin(viewer)) return true;
  // User can see their own email
  if (isOwner({ id: targetUser.id }, currentUser)) return true;
  return false;
}

export function canSeeSensitiveData(viewer: { role: UserRole } | null, targetUser: { id: string }, currentUser: { id: string; role: UserRole } | null): boolean {
  // Admin can see sensitive data
  if (isAdmin(viewer)) return true;
  // User can see their own sensitive data
  if (isOwner({ id: targetUser.id }, currentUser)) return true;
  return false;
}

// Safe parsing functions
export function safeParseAuthorLite(data: unknown): AuthorLiteDTO | null {
  const result = AuthorLiteDTOSchema.safeParse(data);
  if (!result.success) {
    console.error("AuthorLiteDTO validation error:", result.error);
    return null;
  }
  return result.data;
}

export function safeParsePublicUser(data: unknown): PublicUserDTO | null {
  const result = PublicUserDTOSchema.safeParse(data);
  if (!result.success) {
    console.error("PublicUserDTO validation error:", result.error);
    return null;
  }
  return result.data;
}

export function safeParseCurrentUser(data: unknown): CurrentUserDTO | null {
  const result = CurrentUserDTOSchema.safeParse(data);
  if (!result.success) {
    console.error("CurrentUserDTO validation error:", result.error);
    return null;
  }
  return result.data;
}

// Transform Prisma types to DTOs with permission checks
export function toAuthorLiteDTO(user: AuthorLite): AuthorLiteDTO | null {
  try {
    return safeParseAuthorLite({
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      premiumTier: user.premiumTier,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error transforming AuthorLite to DTO:", error);
    return null;
  }
}

export function toPublicUserDTO(
  user: UserWithCounts,
  viewer: { role: UserRole } | null = null,
  currentUser: { id: string; role: UserRole } | null = null
): PublicUserDTO | null {
  try {
    const canSeeEmail = canSeeEmailAddress(viewer, { id: user.id }, currentUser);
    const canSeeSensitive = canSeeSensitiveData(viewer, { id: user.id }, currentUser);

    const dtoData: Partial<PublicUserDTO> = {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      dob: user.dob,
      country: user.country,
      profilePic: user.profilePic,
      profileBanner: user.profileBanner || null,
      isVerified: user.isVerified,
      premiumTier: user.premiumTier,
      accountType: user.accountType,
      accountPrivacy: user.accountPrivacy,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      _count: {
        posts: user._count.posts,
        followers: user._count.followers,
        follows: user._count.follows,
      },
    };

    // Conditionally include sensitive fields
    if (canSeeEmail && user.email) {
      dtoData.email = user.email;
    }

    if (canSeeSensitive) {
      dtoData.isSpam = user.isSpam;
      dtoData.moderationStatus = user.moderationStatus;
      if (user.selectedCategories) {
        dtoData.selectedCategories = user.selectedCategories;
      }
      if (user.interests) {
        dtoData.interests = user.interests;
      }
    }

    return safeParsePublicUser(dtoData);
  } catch (error) {
    console.error("Error transforming UserWithCounts to PublicUserDTO:", error);
    return null;
  }
}

export function toCurrentUserDTO(user: CurrentUser): CurrentUserDTO | null {
  try {
    return safeParseCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      bio: user.bio,
      dob: user.dob,
      isVerified: user.isVerified,
      profileBanner: user.profileBanner || null,
      profilePic: user.profilePic,
      premiumTier: user.premiumTier,
      accountType: user.accountType,
      interests: user.interests || [],
      professionalCategory: user.professionalCategory,
      selectedCategories: user.selectedCategories || [],
      createdAt: user.createdAt,
      _count: {
        posts: user._count.posts,
        followers: user._count.followers,
        follows: user._count.follows,
      },
    });
  } catch (error) {
    console.error("Error transforming CurrentUser to CurrentUserDTO:", error);
    return null;
  }
}

// Batch transformation helpers
export function toAuthorLiteDTOArray(users: AuthorLite[]): AuthorLiteDTO[] {
  return users.map(toAuthorLiteDTO).filter((dto): dto is AuthorLiteDTO => dto !== null);
}

export function toPublicUserDTOArray(
  users: UserWithCounts[],
  viewer: { role: UserRole } | null = null,
  currentUser: { id: string; role: UserRole } | null = null
): PublicUserDTO[] {
  return users
    .map((user) => toPublicUserDTO(user, viewer, currentUser))
    .filter((dto): dto is PublicUserDTO => dto !== null);
}
