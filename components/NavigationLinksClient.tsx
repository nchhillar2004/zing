"use client"
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { FaArrowTrendUp, FaGear } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Muted, P, Small } from "./ui/typography";
import { logout } from "@/actions/logout";
import { User } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
        await logout();
        router.push("/login");
    };

    return (
        <>
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
            <div className="w-full">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size={"xl"} className="w-full" >
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/evilrabbit.png"
                                        alt={`@${user.username}`}
                                    />
                                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="flex flex-col justify-center items-start">
                                    <P className="leading-none text-md">{user.name}</P>
                                    <Small><Muted>@{user.username}</Muted></Small>
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.push(`/user/${user.username}`)}
                                >
                                    Profile
                                </Button>
                                </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </Button>
                )}
            </div>
        </>
    );
}
