import { getCommits } from "@/utils/github";
import { formatISO } from "@/utils/time";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "../ui/card";
import { Small } from "../ui/typography";
import { siteConfig } from "@/config/site-config";

interface GitHubCommit {
    commit: {
        message: string;
        author: { date: string }
    },
    html_url: string;
}

export default async function UpdatesCard(){
    const commits = await getCommits();

    return(
        <Card title="Updates" className="bg-transparent rounded-md">
            <CardHeader>
                <CardTitle>Updates</CardTitle>
                <CardDescription>Latest commits</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {commits && commits.map((commitData: GitHubCommit) => (
                        <li className="flex space-x-4" key={commitData.html_url}>
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-[var(--border)]"></div>
                                <div className="w-px flex-1 bg-[var(--border)]"></div>
                            </div>
                            <div className="flex flex-col justify-start pb-2">
                                <small className="leading-tight">{formatISO(commitData.commit.author.date)}</small>
                                <Link href={commitData.html_url} target="_blank" className="line-clamp-2 text-[16px] text-primary overflow-ellipsis">{commitData.commit?.message}</Link>
                            </div>
                        </li>))}
                </ul>

            </CardContent>
            <CardFooter>
                <Small>
                    <Link target="_blank" href={`${siteConfig.url.github}/commits/main/`} className="text-primary">
                        View all
                    </Link>
                </Small> 
            </CardFooter>
        </Card>
    );
}
