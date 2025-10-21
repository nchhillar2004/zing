import { Post, User } from "@prisma/client";
import { z } from "zod";

export const LoginFormSchema = z.object({
    username: z
    .string()
    .regex(/^[a-z0-9_-]{3,16}$/, { error: "Incorrect username" })
    .trim(),
    password: z
    .string()
    .min(8, { error: "Incorrect password" })
    .trim(),
})

export type LoginFormState = | { error?: string, message?: string, user?: User } | undefined;

export const RegisterationFormSchema = z.object({
    fname: z
    .string()
    .min(2, { error: "Enter full name" })
    .max(30, { error: "Name can contain at most 30 characters" }),
    username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long" })
    .max(16, { error: "Username can contain at most 16 characters" })
    .regex(/^[a-z0-9_-]{3,16}$/, { error: "No special symbols are allowed except underscores and hyphens" })
    .trim(),
    password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .trim(),
    cpassword: z
    .string()
    .min(8, { error: "Passwords do not match" })
    .trim(),
})
.refine((data) => data.password === data.cpassword, {
    error: "Passwords do not match",
    path: ["cpassword"],
});

export type RegisterFormState = | {
    errors?: {
        fname?: string[]
        username?: string[]
        password?: string[]
        cpassword?: string[]
    },
    message?: string,
    username?: string
} | undefined;

export type CreatePostFormState = | {
    error?: string,
    message?: string,
    post?: Post
} | undefined;

