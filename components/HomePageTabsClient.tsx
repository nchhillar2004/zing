"use client";
import { Tabs } from "./ui/tabs";
import { useEffect, useState } from "react";
import Loading from "./Loading";

// I made this components because the home page need to be server side and i need to handle the currect tab state on client
export default function HomePageTabsClient({children}: {children: React.ReactNode}) {   
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

    return(
        <Tabs defaultValue="feed" value={tab} onValueChange={handleTabChange} className="w-full">
            {children}
        </Tabs>
    );
}
