import { getCurrentUser } from "@/lib/dal";
import NavigationLinksClient from "./NavigationLinksClient";
import { User } from "@prisma/client";

export default async function NavigationLinks() {
    const user = await getCurrentUser();
    
    return <NavigationLinksClient user={user as User} />;
}
