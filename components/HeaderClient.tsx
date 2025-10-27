"use client";
import UserAvatar from "./common/UserAvatar";
import { useState, useEffect, useRef } from "react";
import { UserWithCounts } from "@/interfaces/user";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { Pen, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Post, User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface SearchResult {
    id: number;
    type: "post" | "user";
    name: string;
}

export default function HeaderClient({user}: {user: UserWithCounts}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`/search?${params.toString()}`);
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim().length < 2) {
                setResults([]);
                setShowSearchResults(false);
                return;
            }
            fetch(`/api/search?query=${encodeURIComponent(query.trim())}`)
                .then(async (res) => {
                    if(!res.ok){
                        const text = await res.text();
                        console.log(text)
                    }
                    return res.json();
                })
                .then((data) => {
                    const formattedResults: SearchResult[] = [
                        ...data.posts.map((p: Post) => ({ id: p.id, type: "post", name: p.content })),
                        ...data.users.map((u: User) => ({ id: u.id, type: "user", name: u.username }))
                    ];
                    setResults(formattedResults);
                    setShowSearchResults(true);
                });
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            setShowSearchResults(false);
            handleSearch(query.trim());
        }
    }

    const handleSelect = (result: SearchResult) => {
        setShowSearchResults(false);
        if (result.type==="user") replace(`/user/${result.name}`);
        if (result.type==="post") replace(`/post/${result.id}`);
    };

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
            <div className="relative group">
                <Search className="absolute text-muted top-2 left-[6px] z-0" size={16} />
                <Input type="search" placeholder="Search..." 
                    className={`h-8 pl-7 w-54 max-md:w-34 tracking-wide max-sm:w-8 max-md:focus:w-full`} 
                    aria-label="Search" 
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    name="search" 
                    onSubmit={() => handleSubmit}
                    minLength={2} required/>
                {showSearchResults && results.length>0 && (
                    <div className="absolute top-8 w-full overflow-hidden bg-dark-background/95 border-x border-b border-border shadow-sm rounded-b-[var(--radius)]">
                        {results.map((result: SearchResult) => (
                            <div key={`${result.type}-${result.id}`}
                                className="cursor-pointer text-muted py-1 overflow-ellipsis line-clamp-1 px-2 text-nowrap"
                                onClick={() => handleSelect(result)}>
                                {result.type}: <span className="text-primary">{result.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <div className="hover:cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <UserAvatar user={user} size="sm" />
                </div>
                <div 
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
