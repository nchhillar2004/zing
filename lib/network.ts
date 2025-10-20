import { redis } from "./redis";

export async function isServerDown() {
    try{
        await redis.ping()
        return false;
    } catch (error: any){
        return true;
    }
}
