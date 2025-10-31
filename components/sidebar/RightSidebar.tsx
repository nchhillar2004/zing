import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Muted, P, Small } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import UpdatesCard from "@/components/cards/UpdatesCard";
import StatusCard from "@/components/cards/StatusCard";
import { getCurrentUser } from "@/lib/dal";
import WhoToFollow from "../cards/WhoToFollow";
import { siteConfig } from "@/config/site-config";

export default async function RightSidebar() {
    const currentUser = await getCurrentUser();

    return (
        <aside className="max-xl:hidden w-[300px] sticky top-[50px] h-fit right-0 z-10 flex flex-col space-y-[var(--space)]">
            {currentUser && currentUser.premiumTier==="NONE" &&
                <Card title="Subscribe">
                    <CardHeader>
                        <CardTitle>Subscribe to premium</CardTitle>
                        <CardDescription>Subscribe to unlock new features, get access to beta version and grow your reach.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="sm" className="w-fit">
                            <Link href={"/premium"} className="no-underline!">
                                Subscribe
                            </Link>
                        </Button>
                    </CardContent>
                </Card>}

            <WhoToFollow/>

            <UpdatesCard/>

            <StatusCard/>

            <footer className="text-muted text-sm! space-y-1">
                <P className="leading-none">
                    This is an{" "}
                    <Link target="_blank" 
                        href={`${siteConfig.url.github}`} className="text-primary">
                        open source</Link>{" "}project.
                </P>
                <P className="leading-none">
                    Created by{" "}
                    <Link target="_blank" 
                        href={`${siteConfig.BASE_URL}/user/nchhillar`} className="text-primary">
                        @nchhillar</Link>
                </P>
                <ul className="flex text-center w-full flex-wrap items-center space-x-1">
                    <li><Small><Muted><Link href='/terms'>Terms of Service</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/privacy'>Privacy Policy</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/about'>About</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/contact'>Contact Us</Link></Muted></Small></li>
                </ul>
                <Muted className="text-center">&copy; 2025, Zing.</Muted>
            </footer>
        </aside>
    );
}
