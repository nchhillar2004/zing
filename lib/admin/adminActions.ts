"use server"
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/dal";
import { UserRole, ModerationStatus, Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserModeration(
    userId: string,
    moderationStatus: ModerationStatus,
    moderationReason?: string
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                moderationStatus,
                moderationReason: moderationReason || null,
            },
        });

        // Create moderation log
        await prisma.moderationLog.create({
            data: {
                moderatorId: currentUser.id,
                targetUserId: userId,
                action: `Set status to ${moderationStatus}`,
                reason: moderationReason || "No reason provided",
            },
        });

        revalidatePath("/admin");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating user moderation:", error);
        return { success: false, error: "Failed to update user moderation" };
    }
}

export async function updateUserRole(userId: string, role: UserRole) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        await prisma.moderationLog.create({
            data: {
                moderatorId: currentUser.id,
                targetUserId: userId,
                action: `Changed role to ${role}`,
                reason: "Admin action",
            },
        });

        revalidatePath("/admin");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error: "Failed to update user role" };
    }
}

export async function updateUserSpamStatus(userId: string, isSpam: boolean) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { isSpam },
        });

        revalidatePath("/admin");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating spam status:", error);
        return { success: false, error: "Failed to update spam status" };
    }
}

export async function deletePost(postId: string, reason?: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        // Get post author for logging
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true },
        });

        if (post) {
            await prisma.moderationLog.create({
                data: {
                    moderatorId: currentUser.id,
                    targetUserId: post.authorId,
                    action: "Deleted post",
                    reason: reason || "No reason provided",
                },
            });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, error: "Failed to delete post" };
    }
}

export async function updatePostContent(postId: string, content: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const post = await prisma.post.update({
            where: { id: postId },
            data: { content },
        });

        revalidatePath("/admin");
        return { success: true, post };
    } catch (error) {
        console.error("Error updating post:", error);
        return { success: false, error: "Failed to update post" };
    }
}

export async function updateTagName(tagId: string, name: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const tag = await prisma.tag.update({
            where: { id: tagId },
            data: { name },
        });

        revalidatePath("/admin");
        return { success: true, tag };
    } catch (error) {
        console.error("Error updating tag:", error);
        return { success: false, error: "Failed to update tag" };
    }
}

export async function updateTagCategory(tagId: string, category: string | null) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        const tag = await prisma.tag.update({
            where: { id: tagId },
            data: { category: (category ? (category as Category) : null) },
        });

        revalidatePath("/admin");
        return { success: true, tag };
    } catch (error) {
        console.error("Error updating tag category:", error);
        return { success: false, error: "Failed to update tag category" };
    }
}

export async function deleteTag(tagId: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== UserRole.ADMIN) {
            return { success: false, error: "Unauthorized" };
        }

        await prisma.tag.delete({
            where: { id: tagId },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting tag:", error);
        return { success: false, error: "Failed to delete tag" };
    }
}

