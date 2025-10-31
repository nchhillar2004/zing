import { getCurrentUser } from "@/lib/dal";
import MiniUserProfile from "./MiniUserProfile";
import TredingPosts from "../cards/TrendingPosts";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function LeftSidebar() {
    const user = await getCurrentUser();

    return (
        <aside className="h-fit sticky top-[50px] flex flex-col space-y-[var(--space)] w-[300px] max-lg:hidden items-start">
            {user ? <MiniUserProfile user={user} />        
                :
                <Card title="Login" className="w-full">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login now to access all features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={"/login"}>
                            <Button>Login</Button>
                        </Link>
                    </CardContent>
                </Card>

            }
            <TredingPosts/>
        </aside>
    );
}
