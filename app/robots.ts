import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.mylearningplanet.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Standard practice to exclude internal folders if they exist
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
