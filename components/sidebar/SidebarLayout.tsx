import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function SidebarLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex justify-center min-lg:gap-[var(--space)]">
            <LeftSidebar/>
            {children}
            <RightSidebar/>
        </div>
    );
}
