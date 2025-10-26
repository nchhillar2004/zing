import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import MiniUserProfile from "./MiniUserProfile";
import TredingPosts from "../cards/TrendingPosts";

export default async function LeftSidebar() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <aside className="h-fit sticky top-[58px] flex flex-col space-y-[var(--space)] w-[300px] max-lg:hidden items-start">
            <MiniUserProfile user={user} />
            <TredingPosts/>
        </aside>
    );
}
