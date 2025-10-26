import { CurrentUser, UserWithCounts } from "@/interfaces/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export type AvatarSize = "sm" | "md";

export type PostAuthor = {
    id: string;
    name: string;
    username: string;
    isVerified: boolean;
    profilePic?: string;
}

export default function UserAvatar({user, size}: {user: UserWithCounts | CurrentUser | PostAuthor, size: AvatarSize}) {
    return(
        <Avatar className={`${size==="sm" ? "w-10 h-10 border-1" : "w-32 h-32 -top-16 border-6 max-md:border-4"} select-none border-background`}>
            <AvatarImage
                src={user.profilePic ? user.profilePic : "https://github.com/evilrabbit.png"}
                alt={`@${user.username}`}
            />
            <AvatarFallback className={`${size==="sm" ? "text-lg" : "text-2xl"}`}>
                {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
