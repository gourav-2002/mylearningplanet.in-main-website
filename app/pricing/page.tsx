import type { Metadata } from 'next'
import PricingPage from '@/components/PricingPage'

export const metadata: Metadata = {
  title: 'Maths Tuition Fees in Gurgaon | Simple & Transparent Pricing',

  description:
    'Looking for maths tuition fees in Gurgaon? Explore simple, transparent pricing for our online maths classes in Gurgaon with flexible plans for Class 6–10 students.',

  keywords: [
    'maths tuition fees in gurgaon',
    'online maths classes in gurgaon',
    'math coaching fees gurgaon',
    'maths classes price gurgaon',
    'class 6 to 10 maths tuition fees',
    'affordable maths tuition gurgaon'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.com/pricing',
  },

  openGraph: {
    title: 'Maths Tuition Fees in Gurgaon | My Learning Planet Pricing',

    description:
      'Check transparent maths tuition fees in Gurgaon with flexible plans for online maths classes designed for better learning outcomes.',

    url: 'https://www.mylearningplanet.com/pricing',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Maths Tuition Fees in Gurgaon',

    description:
      'Explore simple and flexible pricing for online maths classes in Gurgaon for Class 6–10 students.',
  },
}

export default function Pricing() {
  return <PricingPage />
}