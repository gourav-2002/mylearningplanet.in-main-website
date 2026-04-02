import type { Metadata } from 'next'
import RefundPolicyPage from '@/components/RefundPolicyPage'

export const metadata: Metadata = {
  title: 'Refund Policy | Maths Tuition Fees in Gurgaon | My Learning Planet',

  description:
    'Read the Refund Policy of My Learning Planet to understand cancellation and refund terms for maths tuition fees in Gurgaon and our structured maths tuition services.',

  keywords: [
    'maths tuition fees in gurgaon',
    'maths tuition in gurgaon',
    'refund policy my learning planet',
    'math coaching fees refund',
    'education platform refund policy'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/refund-policy',
  },

  openGraph: {
    title: 'Refund Policy | Maths Tuition Fees in Gurgaon',

    description:
      'Understand refund and cancellation terms for maths tuition fees in Gurgaon with My Learning Planet and our structured learning programs.',

    url: 'https://www.mylearningplanet.in/refund-policy',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Refund Policy | My Learning Planet',

    description:
      'Learn about refund and cancellation terms for our maths tuition services.',
  },
}

export default function RefundPolicy() {
  return <RefundPolicyPage />
}