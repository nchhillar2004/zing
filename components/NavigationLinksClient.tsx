"use client"
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { FaArrowTrendUp, FaGear } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";
import { User } from "@prisma/client";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavigationLinksClientProps {
    user: User | null;
}

export default function NavigationLinksClient({ user }: NavigationLinksClientProps) {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { name: "Home", page: "/", title: "Home page", icon: <GoHomeFill /> },
        { name: "Explore", page: "/search", title: "Explore", icon: <FaSearch /> },
        { name: "Trending", page: "/trending", title: "Trending", icon: <FaArrowTrendUp /> },
        { name: "Bookmarks", page: "/bookmarks", title: "Bookmarks", icon: <FaRegBookmark /> },
        { name: "Premium", page: "/premium", title: "Premium", icon: <AiFillThunderbolt /> },
        { name: "Ads", page: "/ads", title: "Ads", icon: <RiAdvertisementFill /> },
        { name: "Settings", page: "/settings", title: "Settings", icon: <FaGear /> },
    ];

    const handleLogout = async () => {
        toast.promise<{message: string}>(
            () => new Promise((resolve, reject) => {
                logout().then(res => {
                    if (res?.success) {
                        resolve({message: res?.message});
                        router.push("/login");
                    }
                    else reject({ message: res?.message });
                })
            }), {
                loading: "Logging out...",
                success: (data) => `${data.message}`,
                error: (data) => `${data.message}`
            }
        );
    };

    return (
        <>
            <div className="w-full relative">
                {user ? (
                    <div>
                        <div>
                            <Image
                                src={user.profileBanner ? user.profileBanner : "/banner.png"}
                                alt={"profile banner"}
                                height={120}
                                width={1440}
                                className="h-28 w-full object-cover"
                            />
                        </div>
                        <div className="px-4">
                        <Avatar className="absolute top-[70%]">
                            <AvatarImage
                                src={user.profilePic} 
                                alt={`${user.name} profile pic`}>
                            </AvatarImage>
                            <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        </div>
                    </div>
                ) : (
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full"
                            onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    )}
            </div>
            <div className="flex-1 space-y-2 w-full flex flex-col items-start h-fit mt-4">
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
                <Button size={"lg"} className="w-full my-4 bg-[var(--foreground)] hover:bg-[var(--foreground)]/90" onClick={() => router.push("/post/new")}>Post</Button>
            </div>
        </>
    );
}
