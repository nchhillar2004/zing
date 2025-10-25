import { getDeployments, getLatestVersion } from "@/utils/github";
import { formatISO } from "@/utils/time";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "../ui/card";
import { P, Small } from "../ui/typography";
import { siteConfig } from "@/config/site-config";

interface GitHubDeployment {
    url: string;
    id: string;
    environment: string;
    description: string;
    created_at: string;
}

interface LatestVersion {
    html_url: string;
    tag_name: string;
}

export default async function StatusCard(){
    const deployments = await getDeployments();
    const lastestVersion: LatestVersion[] = await getLatestVersion();

    return(
        <Card title="Current version and deployments">
            <CardHeader>
                <CardTitle>{lastestVersion[0].tag_name}</CardTitle>
                <CardDescription>Current version and deployments</CardDescription>
            </CardHeader>
            <CardContent>
                <P className="mb-2">Deployments</P>
                <ul>
                    {deployments && deployments.map((deployment: GitHubDeployment) => (
                        <li className="flex space-x-4" key={deployment.id}>
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-[var(--border)]"></div>
                                <div className="w-px flex-1 bg-[var(--border)]"></div>
                            </div>
                            <div className="flex flex-col justify-start pb-2">
                                <small className="leading-tight">{formatISO(deployment.created_at)}</small>
                                <Link href={deployment.url} target="_blank" className="line-clamp-2 text-[16px] text-primary overflow-ellipsis">{deployment.environment}{deployment.description}</Link>
                            </div>
                        </li>))}
                </ul>

            </CardContent>
            <CardFooter>
                <Small>
                    <Link target="_blank" href={`${siteConfig.url.github}/deployments`} className="text-primary">
                        View all
                    </Link>
                </Small> 
            </CardFooter>
        </Card>
    );
}

