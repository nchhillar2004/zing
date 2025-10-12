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
    <div className="flex items-center justify-center h-svh">
            {children}
        </div>
    );
}
