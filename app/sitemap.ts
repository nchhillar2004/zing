import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site-config'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.BASE_URL || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/premium`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ads`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  try {
    const users = await prisma.user.findMany({
      where: {
        isSpam: false,
        moderationStatus: {
          not: 'BANNED'
        }
      },
      select: {
        username: true,
        updatedAt: true,
      },
      take: 1000,
    })

    const posts = await prisma.post.findMany({
      where: {
        postType: 'POST',
        author: {
          isSpam: false,
          moderationStatus: {
            not: 'BANNED'
          }
        }
      },
      select: {
        id: true,
        updatedAt: true,
      },
      take: 1000,
    })

    const userPages: MetadataRoute.Sitemap = users.map((user) => ({
      url: `${baseUrl}/user/${user.username}`,
      lastModified: user.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    return [...staticPages, ...userPages, ...postPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
