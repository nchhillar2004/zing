"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { H3, P, Small } from "./ui/typography";
import { Bookmark } from "lucide-react";
import PostCard from "./cards/PostCard";
import { UserWithCounts } from "@/interfaces/user";
import Loading from "@/components/common/Loading";
import { BookmarksData } from "@/types/post";
import { getUserBookmarks } from "@/lib/api/user/getUserBookmarks";

type SingleBookmark = BookmarksData["bookmarks"][0];

export default function BookmarksPageClient({ currentUser }: { currentUser: UserWithCounts }) {
    const [bookmarks, setBookmarks] = useState<SingleBookmark[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // ✅ load function
    const loadBookmarks = useCallback(async (pageNum: number) => {
        if (!currentUser?.username) return;

        if (pageNum === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const data = await getUserBookmarks(currentUser.username, pageNum);

            setBookmarks((prev) => {
                const updated = pageNum === 1 ? data.bookmarks : [...prev, ...data.bookmarks];
                if (updated.length >= data.total || data.bookmarks.length === 0) setHasMore(false);
                return updated;
            });

            setTotal(data.total);
        } catch (err) {
            console.error("Failed to load bookmarks:", err);
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [currentUser?.username]);

    // ✅ only load once on mount or when username changes
    useEffect(() => {
        if (currentUser?.username) {
            setPage(1);
            setBookmarks([]);
            setHasMore(true);
            loadBookmarks(1);
        }
    }, [currentUser?.username, loadBookmarks]);

    // ✅ only load when page > 1 (infinite scroll)
    useEffect(() => {
        if (page > 1 && hasMore) {
            loadBookmarks(page);
        }
    }, [page, hasMore, loadBookmarks]);

    // ✅ observer for infinite scroll
    useEffect(() => {
        if (!hasMore || loading || loadingMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        const current = loaderRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [hasMore, loading, loadingMore]);

    return (
        <div className="p-0">
            <div className="px-2">
            <H3>Bookmarks ({total})</H3>
            <Small className="text-muted-foreground">Bookmarks are private to you.</Small>
            </div>
            {loading ? (
                <Loading className="h-24" />
            ) : bookmarks.length === 0 ? (
                <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <P className="text-muted-foreground">No bookmarks</P>
                    <Small className="text-muted-foreground">Bookmark a post to see them here.</Small>
                </div>
            ) : (
                <>
                    {bookmarks.map((bookmark) => (
                        <PostCard key={bookmark.id} post={bookmark.post} />
                    ))}
                    {hasMore && (
                        <div ref={loaderRef}>
                            {loadingMore && <Loading />}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

