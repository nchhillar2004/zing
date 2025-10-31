import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
import GettingStarted from "@/components/GettingStarted";
import { getCurrentUser } from "@/lib/dal";

export default async function HomePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        logout();
        return;
    }

    return (
        <div>
            {currentUser.selectedCategories?.length===0 &&
                <GettingStarted currentUser={currentUser} />}
            <CreatePostForm user={currentUser} />
        </div>
    );
}
