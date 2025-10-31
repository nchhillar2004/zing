import { getCurrentUser } from "@/lib/dal";
import NavigationLinks from "@/components/NavigationLinks";
import { UserWithCounts } from "@/interfaces/user";
import HeaderClient from "./HeaderClient";
import { AiFillThunderbolt } from "react-icons/ai";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header(){ 
    const currentUser: UserWithCounts | null = await getCurrentUser();

    return (
        <header className="bg-background min-w-[320px] h-fit sticky z-20 top-0">
            <nav className="container max-[600px]:px-[var(--space)] flex h-full items-center space-x-4 justify-between">
                <NavigationLinks/>
                <div className="flex flex-1 min-md:justify-center">
                    <Link href={"/"}>
                        <AiFillThunderbolt title={siteConfig.name} className="text-primary hover:cursor-pointer" size={24} />
                    </Link>
                </div>
                {currentUser ?
                    <HeaderClient user={currentUser} />
                    : <Link href={"/login"}><Button size={"sm"} className="border border-background/80">Login</Button></Link>
                }
            </nav>
        </header>
    );
}
