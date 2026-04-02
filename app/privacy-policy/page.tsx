import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | Maths Tuition in Gurgaon | My Learning Planet',

  description:
    'Read the Privacy Policy of My Learning Planet to understand how we collect, use, and protect your data while offering maths tuition in Gurgaon and structured maths coaching in Gurgaon.',

  keywords: [
    'maths tuition in gurgaon',
    'maths coaching in gurgaon',
    'privacy policy my learning planet',
    'student data protection',
    'education platform privacy policy'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.com/privacy-policy',
  },

  openGraph: {
    title: 'Privacy Policy | Maths Tuition in Gurgaon',

    description:
      'Learn how My Learning Planet protects your data while providing maths tuition in Gurgaon and structured coaching for students.',

    url: 'https://www.mylearningplanet.com/privacy-policy',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Privacy Policy | My Learning Planet',

    description:
      'Understand how your data is handled on our maths learning platform.',
  },
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}