import type { Metadata } from 'next'
import TermsOfServicePage from '@/components/TermsOfServicePage'

export const metadata: Metadata = {
  title: 'Terms of Service | Maths Tuition in Gurgaon | My Learning Planet',

  description:
    'Read the Terms of Service of My Learning Planet to understand the rules for accessing our maths tuition in Gurgaon and structured maths coaching in Gurgaon programs.',

  keywords: [
    'maths tuition in gurgaon',
    'maths coaching in gurgaon',
    'terms of service my learning planet',
    'education platform terms',
    'student learning terms and conditions'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/terms-of-service',
  },

  openGraph: {
    title: 'Terms of Service | Maths Tuition in Gurgaon',

    description:
      'Understand the terms and conditions for using My Learning Planet and accessing maths tuition and coaching services in Gurgaon.',

    url: 'https://www.mylearningplanet.in/terms-of-service',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Terms of Service | My Learning Planet',

    description:
      'Read the terms and conditions for using our maths learning platform.',
  },
}

export default function TermsOfService() {
  return <TermsOfServicePage />
}