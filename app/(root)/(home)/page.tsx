import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
import { getCurrentUser } from "@/lib/dal";

export default async function HomePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        logout();
        return;
    }

    return (
    <div>
            <CreatePostForm user={currentUser} />
        </div>
    );
}
