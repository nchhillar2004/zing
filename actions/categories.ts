"use server";

import prisma from "@/lib/db";
import { CategoriesFormState } from "@/lib/definitions";
import { Category } from "@prisma/client";

export async function categoriesAction(state: CategoriesFormState, formData: FormData) {
    const id = formData.get("id") as string;
    const categories = formData.getAll("categories") as Category[];

    if (!id){
        return { success: false, error: "User not found." };
    }else if (categories.length < 4 || categories.length > 8) {
        console.log(categories.length);
        return { success: false, error: "Select between 4 and 8 categories." };
    }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                selectedCategories: categories,
            },
        });

        return { success: true, message: "User categories updated successfully", username: user.username };
    } catch (err: any) {
        console.error("Error updating categories:", err);

        return { success: false, error: "Something went wrong. Please try again later." };
    }
}

