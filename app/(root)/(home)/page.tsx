"use client"
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [tab, setTab] = useState("feed");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTab = (typeof window !== 'undefined') && localStorage.getItem("selectedTab");
        if (savedTab) setTab(savedTab);
        setMounted(true);
    }, []);

    const handleTabChange = (value: string) => {
        setTab(value);
        localStorage.setItem("selectedTab", value);
    };

    if (!mounted) {
        return (
        <Loading/>
        );
    }

    return (
        <Tabs defaultValue="feed" value={tab} onValueChange={handleTabChange} className="w-full">
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
                    <div className="h-[200vh]">No posts to show</div>
                </TabsContent>

                <TabsContent value="following">
                    <div className="h-[200vh]">
                        Please login and follow someone to see posts.
                    </div>
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
        </Tabs>
    );
}
