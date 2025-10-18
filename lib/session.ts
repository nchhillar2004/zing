import { siteConfig } from "@/config/site-config";
import { redis } from "./redis";
import { randomBytes } from "crypto";

const SESSION_TTL = siteConfig.CAP_SESSION_AGE;

export async function createSession(userId: string) {
    const sessionId = randomBytes(64).toString("hex");

    await redis.set(`session:${sessionId}`,
        JSON.stringify({ userId, createdAt: Date.now() }),
        { ex: SESSION_TTL });
    return sessionId;
}

export async function getSession(sessionId: string) {
    const session = await redis.get<string>(`session:${sessionId}`);
    if (!session) return null;
    if (typeof session === "string") return JSON.parse(session);
    return session;
}

export async function deleteSession(sessionId: string) {
    return redis.del(`session:${sessionId}`);
}
