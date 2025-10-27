import { siteConfig } from "@/config/site-config";
const TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_COMMITS_CAP = 4;
const GITHUB_DEPLOYMENTS_CAP = 2;
import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: TOKEN
});

async function githubFetch(endpoint: string) {
    try {
        const response = await octokit.request(`GET ${endpoint}`, {
            owner: siteConfig.github.username,
            repo: siteConfig.github.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            }
        });

        if (!response.data) {
            throw new Error("Error fetching from github");
        }

        return response.data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export const getDeployments = () => githubFetch(`/repos/${siteConfig.github.username}/${siteConfig.github.repo}/deployments?per_page=${GITHUB_DEPLOYMENTS_CAP}`);
export const getCommits = () => githubFetch(`/repos/${siteConfig.github.username}/${siteConfig.github.repo}/commits?per_page=${GITHUB_COMMITS_CAP}`);
export const getLatestVersion = () => githubFetch(`/repos/${siteConfig.github.username}/${siteConfig.github.repo}/releases/`);
