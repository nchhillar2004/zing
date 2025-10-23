import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth overflow-y-scroll`}
            >
                <ThemeProvider
                    attribute="class"
                    enableSystem={false}
                    defaultTheme="dark"
                    themes={['light', 'dark', 'dim']}
                    scriptProps={{ 'data-cfasync': 'false' }}
                    disableTransitionOnChange>
                    <main className="relative">
                        {children}
                    </main>
                    <Toaster/>
                </ThemeProvider>
            </body>
        </html>
    );
}
