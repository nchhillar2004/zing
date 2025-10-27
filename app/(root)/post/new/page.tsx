import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
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
            <div>
                <CreatePostForm user={currentUser} />
                <div className="p-4">
                    <H4>Writing a better post.</H4>
                    <ul className="space-y-2 list-inside list-disc">
                        <li>
                        Start with a clear title Write something short and meaningful that tells readers what your post is about.
                        </li>
                        <li>
                        Be specific – Avoid vague lines. Explain your idea, experience, or question clearly.
                        </li>
                        <li>
                        Use short paragraphs – Makes it easy to read. Add line breaks between points.
                        </li>
                        <li>
                        Add examples or screenshots – If you&apos;re explaining something technical or showing progress, visuals help a lot.
                        </li>
                        <li>
                        Stay respectful and original – Don&apos;t copy others&apos; content or post spam.
                        </li>
                        <li>
                        Ask a clear question (if any) – If your post is about getting help, mention exactly what you tried and what&apos;s not working.
                        </li>
                        <li>
                        Add tags – Helps others find your post easily.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
