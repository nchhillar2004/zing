import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Muted, Small } from "./ui/typography";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import UpdatesCard from "./cards/UpdatesCard";
import StatusCard from "./cards/StatusCard";
import TredingPosts from "./cards/TrendingPosts";

export default function FloatingSidebar() {
    return (
        <aside className="top-4 max-lg:hidden max-w-[350px] sticky h-fit right-0 z-10 py-4 pl-6 flex flex-col space-y-4">
            <Card title="Subscribe" className="bg-transparent rounded-md">
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
            </Card>

            <TredingPosts/>

            <UpdatesCard/>

            <StatusCard/>

            <footer className="text-center text-[12px]">
                <ul className="flex flex-wrap items-center space-x-1">
                    <li><Small><Muted><Link href='/terms'>Terms of Service</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/privacy'>Privacy Policy</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/about'>About</Link></Muted></Small></li>
                    <Separator orientation="vertical"/>
                    <li><Small><Muted><Link href='/contact'>Contact Us</Link></Muted></Small></li>
                </ul>
                <Muted>&copy; 2025, Zing.</Muted>
            </footer>
        </aside>
    );
}
