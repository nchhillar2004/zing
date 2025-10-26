import BookmarksPageClient from "@/components/BookmarksPageClient";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/");
    }

    return(
        <>
            <BookmarksPageClient currentUser={user} />
        </>
    );
}
