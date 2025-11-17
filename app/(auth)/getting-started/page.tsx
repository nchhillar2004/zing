import GettingStarted from "@/components/GettingStarted";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function GettingStartedPage() {
    const currentUser = await getCurrentUser();

    if (currentUser?.selectedCategories.length!==0) redirect("/");

    return(
        <>
            {currentUser && 
                <GettingStarted currentUser={currentUser} />}
        </>
    );
}
