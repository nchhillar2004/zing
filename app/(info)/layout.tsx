import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Info / Zing",
    description: "Modern social media web app - Zing",
};

export default function InfoLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
    <>
            {children}
        </>
    );
}

