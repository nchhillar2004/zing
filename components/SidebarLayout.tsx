import React from "react";
import Sidebar from "./Sidebar";
import FloatingSidebar from "./FloatingSidebar";

export default function SidebarLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex justify-center min-lg:space-x-[var(--space)]">
            <Sidebar/>
            {children}
            <FloatingSidebar/>
        </div>
    );
}
