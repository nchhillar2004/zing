import { CurrentUser, UserWithCounts } from "@/interfaces/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

export type AvatarSize = "sm" | "md" | "lg";

export type PostAuthor = {
    id: string;
    name: string;
    username: string;
    isVerified: boolean;
    profilePic?: string;
}

export default function UserAvatar({user, size, className}: {user: UserWithCounts | CurrentUser | PostAuthor, size?: AvatarSize, className?: string}) {
    return(
        <Avatar className={cn(`${size==="sm" ? "w-8 h-8 border-0" : size==="md" ? "w-11 h-11 border-1" : "w-32 h-32 -top-16 border-6 max-md:border-4"} select-none border-background ${className}`)}>
            <AvatarImage
                src={user.profilePic ? user.profilePic : "https://github.com/evilrabbit.png"}
                alt={`@${user.username}`}
            />
            <AvatarFallback className={`${size==="md" ? "text-lg" : "text-2xl"}`}>
                {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
