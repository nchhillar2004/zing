"use server";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site-config";
import prisma from "@/lib/db";

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
        const user = await prisma.user.findFirst({
            where: { username: username }
        });

        if (!user) return { error: ERROR };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return { error: ERROR };

        const sessionId = await createSession(user.id);
        const cookieStore = await cookies()
        cookieStore.set("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            maxAge: siteConfig.CAP_SESSION_AGE,
            sameSite: "lax",
            path: "/",
        })

        return { message: "User logged in successfully", user: user };
    } catch (err: any) {
        if (err) return { error: "Error logging in." };
        throw err;
    }
}
