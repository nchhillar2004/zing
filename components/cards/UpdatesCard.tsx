"use client";
import { getCommits } from "@/utils/github";
import { formatISO } from "@/utils/time";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "../ui/card";
import { Small } from "../ui/typography";
import { siteConfig } from "@/config/site-config";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface GitHubCommit {
    commit: {
        message: string;
        author: { date: string }
    },
    html_url: string;
}

export default function UpdatesCard(){
    const [commits, setCommits] = useState([]);
    const [close, setClose] = useState(true);

    useEffect(() => {
        async function fetchCommits() {
            const commits = await getCommits();
            setCommits(commits);
        }
        fetchCommits();
    }, [setCommits]);

    return(
        <Card title="Updates">
            <CardHeader>
                <CardTitle className="flex items-center justify-between"><span>Updates</span>
                    <Button title={close ? "Show updates" : "Hide updates"} onClick={() => setClose(!close)} variant={"ghost"} size={"icon"}>
                        {close ? <ChevronsDown size={16}/> : <ChevronsUp size={16} />}
                    </Button>
                </CardTitle>
                <CardDescription>{close ? "Click the arrow to see updates" : "Latest commits"}</CardDescription>
            </CardHeader>
            {!close && <>
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
            </CardFooter></>}
        </Card>
    );
}
