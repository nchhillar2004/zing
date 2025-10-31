import Header from "@/components/Header";
import Loading from "@/components/common/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "User / Zing",
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
            <div className="container">
                <main className="max-[600px]:px-[var(--space)] min-[600px]:rounded-[var(--radius)] w-full min-w-[320px] max-lg:w-full">
                    <Suspense fallback={<Loading/>}>
                        {children}
                    </Suspense>
                </main>
            </div>
        </>
    );
}

