"use client";
import Link from "next/link";
import UserAvatar from "../common/UserAvatar";
import { CurrentUser } from "@/interfaces/user";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Image as ImageIcon, ImagePlay, List, MapPin, Smile } from "lucide-react";
import { Muted, P } from "../ui/typography";
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';
import CreatePoll, { PollValue } from "./CreatePoll";
import createPostAction from "@/actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddFilesInPost from "./AddFilesInPost";
import { Separator } from "@/components/ui/separator";
import { PostType } from "@prisma/client";
import { PostOrReply } from "@/types/post";

interface ICreatePostForm{
    user: CurrentUser;
    parent?: PostOrReply;
    type?: PostType;
}

export default function CreatePostForm({user, parent, type}: ICreatePostForm) {
    const postType: PostType = type ? type : "POST";
    const isReply = postType==="REPLY";
    const [state, action, pending] = useActionState(createPostAction, undefined);
    const [text, setText] = useState("");
    const [poll, setPoll] = useState(false);
    const [addFiles, setAddFiles] = useState(false);
    const [pollValue, setPollValue] = useState<PollValue>();
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [gifPicker, setGIFPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    let MAX_POST_CHARACTERS: number = user.premiumTier==="NONE" ? 300 : (user.premiumTier==="BASIC" ? 600 : 2000);
    // TODO:   const GIPHY_SDK_API_KEY = process.env.GIPHY_SDK_API_KEY;
    const router = useRouter();

    const pendingPoll = poll && (!pollValue?.option1 || !pollValue.option2 || !pollValue.pollLength);

    useEffect(() => {
        if(state?.success) {
            if (postType === "POST"){
                toast.success("Post created");
                router.push(`/post/${state.post?.id}`)
            } else if (postType==="REPLY"){
                toast.success("Reply created");
                window.location.reload();
            }
        }else if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setEmojiPicker(false);
            }
        }

        if (emojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [emojiPicker]);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const addPoll = () => {
        setPoll(true);
    }; 

    return(
        <form action={action} className="py-2 px-3 border-b border-b-border">
            <div className={`flex ${!isReply && "gap-1"}`}>
                {!isReply &&
                    <Link href={`/user/${user.username}`} className={`hover:no-underline! h-fit`}>
                        <UserAvatar user={user} size="sm" />
                    </Link>
                }
                <input type="hidden" name="postType" value={postType} />
                {parent && <input type="hidden" name="parentId" value={parent.id} />}
                <div className="flex-1 space-y-3">
                    <Textarea 
                        value={text} 
                        rows={poll ? 1 : 2}
                        onChange={(e) => setText(e.target.value.slice(0, MAX_POST_CHARACTERS))} 
                        ref={textareaRef} 
                        name="content"
                        onInput={handleInput} 
                        maxLength={MAX_POST_CHARACTERS} 
                        placeholder={isReply ? "Post a reply..." : (poll ? "Ask a question..." : "Create a post...")}
                        className={`bg-transparent! border-none! text-xl! ${poll ? "max-h-[40vh]" : "max-h-[60vh]"}`}
                        required/>
                    {addFiles && <AddFilesInPost/>}
                    {poll && 
                        <CreatePoll setPoll={setPoll} setPollValue={setPollValue} />
                    }
                    {text.length===MAX_POST_CHARACTERS && 
                        <div 
                            className="bg-primary/20 border border-border py-2 px-4 mb-2 mt-4 rounded-md">
                            <P>You&apos;ve reached the maximum limit of {MAX_POST_CHARACTERS} characters. 
                                {!(user.premiumTier==="PRO") && "Upgrade your plan to write larger posts."}
                            </P>
                        </div>}
                </div>
            </div>
            <Separator orientation="horizontal" className="my-4" />
            <div className="flex justify-between gap-4 max-md:gap-2 max-md:overflow-x-scroll">
                <div className="flex items-center gap-1">
                    <Button type="button" onClick={() => setAddFiles(!addFiles)} size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Upload Image"><ImageIcon className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button type="button" onClick={() => setGIFPicker(!gifPicker)} size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Select GIF"><ImagePlay className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button type="button" disabled={isReply} onClick={addPoll} size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Create Poll"><List className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button type="button" onClick={() => {setEmojiPicker(!emojiPicker)}}  size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Add Emoji"><Smile className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                    <Button type="button" size={"icon"} variant={"ghost"} className="text-primary hover:bg-primary/10" title="Share Location"><MapPin className="h-[1.25rem]! w-[1.25rem]!"/></Button>
                </div>
                <div className="flex items-center gap-4 max-md:gap-2">
                    {text &&
                        <Muted className="text-[16px]">{text.length}/{MAX_POST_CHARACTERS}</Muted>}
                    <Button 
                        size={"sm"} 
                        type="submit"
                        className="font-semibold bg-[var(--foreground)] hover:bg-[var(--foreground)]/90" 
                        disabled={!text || pendingPoll || pending}>
                        {!isReply && (pending ? "Posting..." : "Post")}
                        {isReply && (pending ? "Replying..." : "Reply")}
                    </Button>
                </div>
            </div>
            {emojiPicker && <div ref={pickerRef} className="absolute z-20">
                <EmojiPicker 
                    onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
                    theme={Theme.AUTO}
                    emojiStyle={EmojiStyle.NATIVE}
                    skinTonesDisabled
                />
            </div>
            }
            {gifPicker && 
                <div ref={pickerRef} className="absolute z-20">
                </div>
            }
        </form>
    );
}
