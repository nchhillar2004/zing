import { getCurrentUser } from "@/lib/dal";
import NavigationLinks from "./sidebar/NavigationLinks";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default async function Header(){ 
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/login");

    return (
        <header className="bg-background max-[600px]:px-[var(--space)] border-b min-w-[320px] border-border py-2 h-12 sticky z-20 top-0">
            <nav className="container flex h-full items-center justify-between">
                <div>
                    <NavigationLinks/>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>Click me</DropdownMenuTrigger>
                        <DropdownMenuContent>See me</DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
}
