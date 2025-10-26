"use client"
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function NavigationLinks() {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { name: "Home", page: "/", title: "Home page", icon: <GoHomeFill /> },
        { name: "Notifications", page: "/#", title: "Notifications", icon: <Bell /> },
        { name: "Premium", page: "/premium", title: "Premium", icon: <AiFillThunderbolt /> },
    ];

    return (
        <>
            <div className="flex-1 space-x-2 w-full flex items-start h-fit">
                {links.map((link) => {
                    const isActive = pathname === link.page || pathname.startsWith(link.page + "/");
                    return (
                        <div key={link.page} className="group w-full cursor-pointer"
                            onClick={() => router.push(link.page)} >
                            <Button variant={isActive ? "active" : "ghost"}
                                title={link.title}
                                size="xl">
                                {link.icon}{link.name}
                            </Button>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
