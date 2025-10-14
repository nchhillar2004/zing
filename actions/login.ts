"use server";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import bcrypt from "bcryptjs";

export async function loginAction(state: LoginFormState, formData: FormData) {
    const ERROR = "Invalid username or password.";
    
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password")
    });

    if (!validatedFields.success) {
        return {error: ERROR};
    }

    const { username, password } = validatedFields.data;

    try {
        const user = await prisma?.user.findFirst({
            where: { username: username }
        });

        if (!user) return { error: ERROR };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return { error: ERROR };

        return { message: "User logged in successfully", user: user };
    } catch (err: any) {
        if (err) return { error: "Error logging in." };
        throw err;
    }
}

