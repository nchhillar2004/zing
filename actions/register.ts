"use server";
import prisma from "@/lib/db";
import { RegisterationFormSchema, RegisterFormState } from "@/lib/definitions";
import { getUserGeodata } from "@/utils/geodata";
import { getCurrentTime } from "@/utils/time";
import bcrypt from "bcryptjs";

export async function registerAction(state: RegisterFormState, formData: FormData) {
    const validatedFields = RegisterationFormSchema.safeParse({
        fname: formData.get("fname") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        cpassword: formData.get("cpassword") as string,
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    const { fname, username, password } = validatedFields.data;

    if (username) {
        const exists = await prisma.user.findFirst({
            where: { username: username }
        });
        if (exists) throw new Error("Username already registered");
    }

    const time = getCurrentTime();
    const { geodata, country, timezone } = await getUserGeodata();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: fname,
                username,
                password: hashedPassword,
                time,
                country,
                timezone,
                geodata
            }
        })
        return { message: "User registered successfully", username: user.username };
    } catch (err: any) {
        if (err.code === "P2002") {
            return { errors: { username: ["Username or email already exists"] } };
        }
        throw err;
    }
}
