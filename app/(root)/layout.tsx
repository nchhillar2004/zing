import Header from "@/components/Header";
import Loading from "@/components/common/Loading";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import type { Metadata } from "next";
import { Suspense } from "react";

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
            <Header/>
            <div className="container min-[600px]:pt-[var(--space)]">
                <SidebarLayout>
                    <main className="max-[600px]:px-[var(--space)] min-h-screen min-[600px]:border min-[600px]:rounded-[var(--radius)] bg-background border-border flex-1 max-w-[600px] min-w-[320px] max-lg:w-full">
                        <Suspense fallback={<Loading/>}>
                            {children}
                        </Suspense>
                    </main>
                </SidebarLayout>
            </div>
        </>
    );
}
