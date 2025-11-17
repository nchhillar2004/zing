import SiteLogo from "@/components/common/SiteLogo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth / Zing",
    description: "Modern social media web app - Zing",
};

export default function AuthLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <>
            <header className="bg-background min-w-[320px] w-full fixed top-0 z-20 py-2">
                <nav className="max-[600px]:px-[var(--space)] flex h-full items-center space-x-4 justify-between">
                    <SiteLogo/>
                </nav>
            </header>
            <div className="relative h-svh bg-[url('/banner.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-dark-background/75"></div>
                <div className="relative flex items-center justify-center h-full">
                    {children}
                </div>
            </div>
        </>
    );
}
