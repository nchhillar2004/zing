import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`antialiased scroll-smooth`}
            >
                <ThemeProvider
                    enableSystem={false}
                    defaultTheme="dim"
                    themes={['light', 'dim', 'dark']}
                    scriptProps={{ 'data-cfasync': 'false' }}
                    disableTransitionOnChange>
                    {children}
                    <Toaster/>
                </ThemeProvider>
                <Analytics/>
                <SpeedInsights/>
            </body>
        </html>
    );
}
