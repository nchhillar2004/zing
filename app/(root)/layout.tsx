import SidebarLayout from "@/components/SidebarLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home / Zing",
    description: "Modern social media web app - Zing",
};

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <>
            <SidebarLayout>
                <div className="min-lg:border-x min-md:border-l border-[--border] flex-1 max-w-[600px] max-md:min-w-[320px] max-md:w-full">
                    {children}
                </div>
            </SidebarLayout>
        </>
    );
}
