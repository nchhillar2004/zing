"use server";

import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";

export async function logout() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
        return { success: false, message: "Session not found" };
    }

    try {
        await deleteSession(sessionId);
        cookieStore.delete("sessionId");
        return { success: true, message: "Logged out successfully" };
    } catch(err) {
        return { success: false, message: "Failed to logout, try again" };
    }
}
