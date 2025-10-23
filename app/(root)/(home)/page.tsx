import { logout } from "@/actions/logout";
import CreatePostForm from "@/components/forms/CreatePostForm";
import Header from "@/components/Header";
import HomePageTabsClient from "@/components/HomePageTabsClient";
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/dal";

export default async function HomePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        logout();
        return;
    }

    return (
        <HomePageTabsClient>
            <Header variant="tabs">
                <TabsList className="h-full flex items-center w-full justify-start max-md:overflow-x-scroll overflow-hidden">
                    <TabsTrigger value="feed">For you</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="news">News</TabsTrigger>
                    <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
                </TabsList>
            </Header>
            <div>
                <TabsContent value="feed">
                    <CreatePostForm user={currentUser} />
                </TabsContent>

                <TabsContent value="following">
                    <CreatePostForm user={currentUser} />
                </TabsContent>

                <TabsContent value="news">
                    <div className="h-[200vh]">
                        Featured posts
                    </div>
                </TabsContent>

                <TabsContent value="sponsored">
                    <div className="h-[200vh]">
                        Sponsored
                    </div>
                </TabsContent>
            </div>
        </HomePageTabsClient>
    );
}
