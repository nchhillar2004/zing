"use server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/dal";
import { CreatePostFormState } from "@/lib/definitions";
import { PostType } from "@prisma/client";

export default async function createPostAction(state: CreatePostFormState, formData: FormData) {
    const content = formData.get("content") as string;
    const postType = formData.get("postType") as PostType;
    const parentId = formData.get("parentId") as string;
    const user = await getCurrentUser();

    if (!content || !user) {
        return { success: false, error: "Post content or user not found" };
    }

    try {
        const hashtags = content.match(/#\w+/g) || [];
        const tagNames = hashtags.map(tag => tag.slice(1).toLowerCase());
        const uniqueTagNames = Array.from(new Set(tagNames));

        const tags = await Promise.all(
            uniqueTagNames.map(async (name) => {
                let tag = await prisma.tag.findUnique({ where: { name } });
                if (!tag) {
                    tag = await prisma.tag.create({ data: { name } });
                }
                return tag;
            })
        );

        const post = await prisma.post.create({
            data: {
                content,
                authorId: user.id,
                postType,
                parentId: parentId || null,
                tags: {
                    create: tags.map((tag) => ({
                        tag: { connect: { id: tag.id } },
                    })),
                },
            },
            include: {
                tags: { include: { tag: true } },
            },
        });

        return { success: true, message: "Post created successfully", post: post };
    } catch (err) {
        console.log(err);
        return { success: false, error: "Error creating post" };
    }
}

