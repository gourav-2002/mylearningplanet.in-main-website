import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mylearningplanet.com'
  
  const mainRoutes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/curriculum', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/how-it-works', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/testimonials', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/app-preview', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/blog/why-child-forgets-math-concepts', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/blog/gurgaon-parent-guide-math-coaching-2026', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/refund-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/cookie-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return mainRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
