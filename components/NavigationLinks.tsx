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
        { name: "Notifications", page: "/bookmarks", title: "Notifications", icon: <Bell /> },
        { name: "Premium", page: "/premium", title: "Premium", icon: <AiFillThunderbolt /> },
    ];

    return (
        <>
            <div className="space-x-1 flex items-center h-fit max-md:hidden">
                {links.map((link) => {
                    const isActive = pathname === link.page || pathname.startsWith(link.page + "/");
                    return (
                        <div key={link.page} className="group cursor-pointer"
                            onClick={() => router.push(link.page)} >
                            <Button variant={isActive ? "activeTab" : "tab"}
                                title={link.title} size={"tab"}>
                                <span className="text-[12px]">{link.icon}</span>{link.name}
                            </Button>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
