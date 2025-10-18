import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/about',
          '/privacy',
          '/terms',
          '/premium',
          '/search',
          '/trending',
          '/user/*',
          '/post/*'
        ],
        disallow: [
          '/',
          '/login',
          '/register',
          '/settings',
          '/bookmarks',
          '/user/settings',
          '/post/new',
          '/api/*',
          '/_next/*',
          '/admin/*'
        ],
      },
    ],
    sitemap: `${siteConfig.BASE_URL}/sitemap.xml`,
    host: siteConfig.BASE_URL,
  }
}
