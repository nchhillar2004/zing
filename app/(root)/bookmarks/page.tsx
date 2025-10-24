import BookmarksPageClient from "@/components/BookmarksPageClient";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    return(
        <>
            <Header variant="title" title="Bookmarks" />
            <BookmarksPageClient currentUser={user} />
        </>
    );
}
