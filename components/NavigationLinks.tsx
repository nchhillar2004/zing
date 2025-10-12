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

export default function NavigationLinks() {
    const pathname = usePathname();
    const router = useRouter();
    const username = "demo";

    const links = [
        { name: "Home", page: "/", title: "Home page", icon: <GoHomeFill/> },
        { name: "Explore", page: "/search", title: "Explore", icon: <FaSearch/> },
        { name: "Trending", page: "/trending", title: "Trending", icon: <FaArrowTrendUp/> },
        { name: "Bookmarks", page: "/bookmarks", title: "Bookmarks", icon: <FaRegBookmark/> },
        { name: "Premium", page: "/premium", title: "Premium", icon: <AiFillThunderbolt/> },
        { name: "Ads", page: "/ads", title: "Ads", icon: <RiAdvertisementFill/> },
        { name: "Settings", page: "/settings", title: "Settings", icon: <FaGear/> },
    ];

    return(
        <>
            <div className="flex-1 space-y-2 w-full flex flex-col items-start h-fit mt-4">
                {links.map((link) => {
                    const isActive = pathname===link.page || pathname.startsWith(link.page + "/");
                    return(
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
                <Button variant="ghost"  size={"xl"} className="w-full" 
                    onClick={() => router.push(`/user/${username}`)}>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>Z</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col justify-center items-start">
                        <P className="leading-none text-md">User name</P>
                        <Small><Muted>@username</Muted></Small>
                    </span>
                </Button>
            </div>
        </>
    );
}
