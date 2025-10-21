import { redis } from "./redis";

export async function isServerDown() {
    try{
        await redis.ping()
        return { success: true, message: "Server working" };
    } catch (err){
        return { success: false, err: err };
    }
}
