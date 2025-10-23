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
        <div className="container">
            <SidebarLayout>
                <div className="min-lg:border-x min-lg:border-l border-border flex-1 max-w-[660px] max-md:min-w-[320px] max-lg:w-full">
                    {children}
                </div>
            </SidebarLayout>
        </div>
    );
}
