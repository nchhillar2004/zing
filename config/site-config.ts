export const siteConfig = {
    name: "Zing",
    title: "Zing",
    description: "Modern social media web app",
    url: {
        github: "https://github.com/nchhillar2004/zing"
    },
    github: {
        username: "nchhillar2004",
        repo: "zing"
    },
    BASE_URL: process.env.NODE_ENV === "production" ? process.env.BASE_URL : "http://localhost:3000",
    CAP_SESSION_AGE: 60 * 60 * 24 * 7, // 7 days
}
