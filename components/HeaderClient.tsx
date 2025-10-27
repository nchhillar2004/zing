"use client";
import UserAvatar from "./common/UserAvatar";
import { useState, useEffect, useRef } from "react";
import { UserWithCounts } from "@/interfaces/user";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import SearchForm from "./forms/SearchForm";

export default function HeaderClient({user}: {user: UserWithCounts}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    });

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

    return(
        <div className="flex space-x-4 items-center py-1">
            <SearchForm/>

            <div>
                <div className="hover:cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <UserAvatar user={user} size="sm" />
                </div>
                <div ref={dropdownRef}
                    className={`absolute top-10 -ml-10 max-md:-ml-20 w-fit h-fit max-w-40 max-h-60 rounded-[var(--radius)] overflow-hidden
bg-dark-background/95 border border-border shadow-sm z-20 ${dropdownOpen ? "block" : "hidden"}`}>
                    <div className="flex flex-col py-2">
                        <Button onClick={() => router.push(`/user/${user.username}`)} variant={"ghost"} 
                            className="hover:bg-primary gap-0 h-fit rounded-none flex flex-col justify-center items-start">
                            <b className="leading-none line-clamp-1! overflow-ellipsis w-full">{user.name}</b>
                            <span className="leading-none text-[13px] text-foreground/80">Profile</span>
                        </Button>
                        <Separator orientation="horizontal" className="my-1" />
                        <Button onClick={() => router.push(`/settings`)} variant={"ghost"} size={"sm"} className="hover:bg-primary text-foreground/80 hover:text-foreground gap-0 rounded-none flex flex-col justify-center items-start">
                            Settings
                        </Button>
                        <Button onClick={() => router.push(`/bookmarks`)} variant={"ghost"} size={"sm"} className="hover:bg-primary text-foreground/80 hover:text-foreground gap-0 rounded-none flex flex-col justify-center items-start">
                            Bookmarks
                        </Button>
                        <Button onClick={() => router.push(`/user/${user.username}`)} variant={"ghost"} size={"sm"} className="hover:bg-primary text-foreground/80 hover:text-foreground gap-0 rounded-none flex flex-col justify-center items-start">
                            Followers
                        </Button>
                        <Separator orientation="horizontal" className="my-1" />
                        <Button onClick={handleLogout} variant={"ghost"} size={"sm"} className="hover:text-red-500 dark:hover:text-red-400 text-foreground/80 gap-0 rounded-none flex flex-col justify-center items-start">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <Button size={"sm"} className="border border-background/80">
                <Pen/>
                Post
            </Button>
        </div>
    );
}
