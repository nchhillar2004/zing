import EditProfileForm from "@/components/forms/EditProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/dal";

export default async function UserSettings() {
    const currentUser = await getCurrentUser();

    if (!currentUser) return;

    return(
        <div className="py-2 px-4 space-y-[var(--space)]">
            <H3>User settings</H3>
            <Card>
                <CardHeader>
                    <CardTitle>Edit profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditProfileForm user={currentUser} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Privacy settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditProfileForm user={currentUser} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Delete account</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditProfileForm user={currentUser} />
                </CardContent>
            </Card>
        </div>
    );
}
