import type { Metadata } from 'next'
import CookiePolicyPage from '@/components/CookiePolicyPage'

export const metadata: Metadata = {
  title: 'Cookie Policy | Online Maths Classes in Gurgaon | My Learning Planet',

  description:
    'This Cookie Policy explains how My Learning Planet uses cookies to improve your experience on our online maths classes in Gurgaon and maths tuition in Gurgaon for students.',

  keywords: [
    'online maths classes in gurgaon',
    'maths tuition in gurgaon',
    'best online maths classes in gurgaon',
    'maths coaching gurgaon',
    'cookie policy my learning planet',
    'education platform cookies'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/cookie-policy',
  },

  openGraph: {
    title: 'Cookie Policy | Online Maths Classes in Gurgaon',

    description:
      'Learn how cookies are used on My Learning Planet to support online maths classes in Gurgaon and maths tuition in Gurgaon for better user experience.',

    url: 'https://www.mylearningplanet.in/cookie-policy',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Cookie Policy | Online Maths Classes in Gurgaon',

    description:
      'Understand how cookies help improve your experience on our online maths classes and maths tuition services in Gurgaon.',
  },
}

export default function CookiePolicy() {
  return <CookiePolicyPage />
}