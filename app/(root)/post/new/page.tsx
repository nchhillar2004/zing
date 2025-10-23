import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
import Header from "@/components/Header";
import { H4 } from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/dal";

export default async function NewPostPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        logout();
        return;
    }

    return(
        <>
            <Header variant="title" title="Create a post" />
            <div>
                <CreatePostForm user={currentUser} />
                <div>
                    <H4>TODO: add tips for better posting</H4>
                </div>
            </div>
        </>
    );
}
