import Loading from "@/components/common/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/dal";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin / Zing",
    description: "Modern social media web app - Zing",
};

export default async function AdminLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role!==UserRole.ADMIN) redirect("/");

    return (
        <>
            <div className="container">
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </div>
        </>
    );
}


