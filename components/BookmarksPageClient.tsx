"use client";
import { useEffect, useState } from "react";
import { P, Small } from "./ui/typography";
import { 
    Bookmark
} from "lucide-react";
import PostCard from "./cards/PostCard";
import { CurrentUser } from "@/interfaces/user";
import Loading from "./Loading";
import { BookmarksData } from "@/types/post";
import { getUserBookmarks } from "@/lib/api/user/getUserBookmarks";


export default function BookmarksPageClient({currentUser}: {currentUser: CurrentUser}) {
    const [bookmarks, setBookmarks] = useState<BookmarksData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const bookmarks: BookmarksData = await getUserBookmarks(currentUser?.username);
            setBookmarks(bookmarks);
            setLoading(false);
        }
        fetchBookmarks();
    }, [setBookmarks]);

    return(
        <div className="p-0">
            <Small className="text-muted-foreground">Bookmarks are private to you.</Small>
            {loading ? <Loading className="h-24" /> : <>
                {bookmarks?.total === 0 ? (
                    <div className="text-center py-12">
                        <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <P className="text-muted-foreground">No bookmarks</P>
                        <Small className="text-muted-foreground">Bookmark a posts to see them here.</Small>
                    </div>
                ) : (
                        bookmarks?.bookmarks.map((bookmark) => (
                            <PostCard key={bookmark.id} post={bookmark.post} /> 
                        ))
                    )}
            </>}
        </div>
    );
}

