"use client"
import Link from "next/link";
import UserAvatar from "../common/UserAvatar";
import { CurrentUser } from "@/interfaces/user";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Image, List, MapPin, Smile } from "lucide-react";
import { Muted, P } from "../ui/typography";

export default function CreatePostForm({user}: {user: CurrentUser}) {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const MAX_POST_CHARACTERS: number = user.premiumTier==="NONE" ? 300 : (user.premiumTier==="BASIC" ? 600 : 2000);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };
    return(
        <form className="py-2 px-3 border-b border-b-border space-y-2">
            <div className="flex gap-1">
                <Link href={`/user/${user.username}`} className="hover:no-underline!">
                    <UserAvatar user={user} size="sm" />
                </Link>
                <div className="flex-1">
                    <Textarea 
                        value={text} 
                        onChange={(e) => setText(e.target.value.slice(0, MAX_POST_CHARACTERS))} 
                        ref={textareaRef} 
                        onInput={handleInput} 
                        maxLength={MAX_POST_CHARACTERS} 
                        placeholder="Create a post..." 
                        className="bg-transparent! border-none! text-xl! max-h-[60vh]"
                        required/>
                    {text.length===MAX_POST_CHARACTERS && 
                        <div 
                            className="bg-primary/20 border border-border py-2 px-4 mb-2 mt-4 rounded-md">
                        <P>You&apos;ve reached the maximum limit of {MAX_POST_CHARACTERS} characters. 
                            {!(user.premiumTier==="PRO") && "Upgrade your plan to write larger posts."}
                        </P>
                    </div>}
                </div>
            </div>
            <div className="flex justify-between gap-4 max-md:gap-2 max-md:overflow-x-scroll">
                <div className="flex items-center gap-1">
                    <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Upload Image"><Image className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Create Poll"><List className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Add Emoji"><Smile className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Share Location"><MapPin className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                </div>
                <div className="flex items-center gap-4 max-md:gap-2">
                    {text &&
                        <Muted className="text-[16px]">{text.length}/{MAX_POST_CHARACTERS}</Muted>}
                    <Button 
                        size={"sm"} 
                        className="font-semibold bg-[var(--foreground)] hover:bg-[var(--foreground)]/90" 
                        disabled={!text}>
                        Post
                    </Button>
                </div>
            </div>
        </form>
    );
}
