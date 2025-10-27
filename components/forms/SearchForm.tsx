"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Post, User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
    id: number;
    type: "post" | "user";
    name: string;
}

export default function SearchForm() {
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

    return(
        <form className="relative group" onSubmit={handleSubmit}>
            <Search className="absolute text-muted top-2 left-[6px] z-0" size={16} />
            <Input type="search" placeholder="Search..." 
                className={`h-8 pl-7 w-54 max-md:w-34 tracking-wide max-sm:w-8 max-md:focus:w-full`} 
                aria-label="Search" 
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                name="search"
                minLength={2} required/>
            {showSearchResults && results.length>0 && (
                <div ref={dropdownRef} className="absolute top-8 w-full overflow-hidden bg-dark-background/95 border-x border-b border-border shadow-sm rounded-b-[var(--radius)]">
                    {results.map((result: SearchResult) => (
                        <div key={`${result.type}-${result.id}`}
                            className="cursor-pointer text-muted py-1 overflow-ellipsis line-clamp-1 px-2 text-nowrap"
                            onClick={() => handleSelect(result)}>
                            {result.type}: <span className="text-primary">{result.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </form>

    );
}
