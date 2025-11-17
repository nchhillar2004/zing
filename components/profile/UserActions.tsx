"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { UserPlus, Ban, Link as LinkIcon } from "lucide-react";
import { followUser, isFollowing } from "@/lib/api/user/followUser";
import { blockUser, isBlocked } from "@/lib/api/user/blockUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site-config";

interface UserActionsProps {
    userId: string;
    username: string;
    accountPrivacy: string;
    currentUserId: string | null;
}

export function FollowButton({ userId, username, accountPrivacy, currentUserId }: UserActionsProps) {
    const [following, setFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkFollowStatus() {
            if (!currentUserId) {
                setLoading(false);
                return;
            }
            const isFollowingUser = await isFollowing(currentUserId, userId);
            setFollowing(isFollowingUser);
            setLoading(false);
        }
        checkFollowStatus();
    }, [currentUserId, userId]);

    const handleFollow = async () => {
        if (!currentUserId) {
            toast.error("Please login to follow users");
            return;
        }

        setPending(true);
        const result = await followUser(userId);
        
        if (result.success) {
            if (result.message === "FOLLOWED" || result.message === "REQUESTED") {
                setFollowing(true);
                toast.success(
                    result.message === "REQUESTED" 
                        ? "Follow request sent" 
                        : `Now following @${username}`
                );
                router.refresh();
            } else if (result.message === "UNFOLLOWED") {
                setFollowing(false);
                toast.success(`Unfollowed @${username}`);
                router.refresh();
            }
        } else {
            toast.error(result.error || "Failed to follow user");
        }
        setPending(false);
    };

    if (loading) {
        return (
            <Button variant="outline" size="sm" disabled>
                <UserPlus className="mr-2" size={16} />
                Loading...
            </Button>
        );
    }

    return (
        <Button 
            variant="outline" 
            size="sm"
            onClick={handleFollow}
            disabled={pending}
        >
            <UserPlus className="mr-2" size={16} />
            {following ? "Unfollow" : accountPrivacy === "PUBLIC" ? "Follow" : "Request"}
        </Button>
    );
}

export function BlockButton({ userId, username, currentUserId }: { userId: string; username: string; currentUserId: string | null }) {
    const [blocked, setBlocked] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkBlockStatus() {
            if (!currentUserId) {
                setLoading(false);
                return;
            }
            const isBlockedUser = await isBlocked(currentUserId, userId);
            setBlocked(isBlockedUser);
            setLoading(false);
        }
        checkBlockStatus();
    }, [currentUserId, userId]);

    const handleBlock = async () => {
        if (!currentUserId) {
            toast.error("Please login to block users");
            return;
        }

        setPending(true);
        const result = await blockUser(userId);
        
        if (result.success) {
            if (result.message === "BLOCKED") {
                setBlocked(true);
                toast.success(`Blocked @${username}`);
                router.refresh();
            } else if (result.message === "UNBLOCKED") {
                setBlocked(false);
                toast.success(`Unblocked @${username}`);
                router.refresh();
            }
        } else {
            toast.error(result.error || "Failed to block user");
        }
        setPending(false);
    };

    if (loading) {
        return (
            <Button variant="ghost" size="sm" disabled>
                <Ban className="mr-2" size={16} />
                Loading...
            </Button>
        );
    }

    return (
        <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBlock}
            disabled={pending}
            className={blocked ? "text-red-500" : ""}
        >
            <Ban className="mr-2" size={16} />
            {blocked ? "Unblock" : "Block"} @{username}
        </Button>
    );
}

export function CopyProfileLinkButton({ username }: { username: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const profileUrl = `${siteConfig.BASE_URL}/user/${username}`;
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            toast.success("Profile link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCopy}
        >
            <LinkIcon className="mr-2" size={16} />
            {copied ? "Copied!" : "Copy profile link"}
        </Button>
    );
}

