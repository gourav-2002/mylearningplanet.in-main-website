import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mylearningplanet.com'
  
  const routes = [
    '',
    '/about',
    '/curriculum',
    '/how-it-works',
    '/testimonials',
    '/pricing',
    '/faq',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy',
    '/app-preview',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
