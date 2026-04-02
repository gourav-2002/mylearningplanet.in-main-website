import type { Metadata } from 'next'
import AppPreviewPage from '@/components/AppPreviewPage'

export const metadata: Metadata = {
  title: 'Online Maths Classes in Gurgaon | Smart Learning App for Students',

  description:
    'Looking for online maths classes in Gurgaon? Try My Learning Planet app with live classes, structured lessons, and easy-to-follow maths learning for Class 6–10 students near you.',

  keywords: [
    'online maths classes in gurgaon',
    'online maths classes near me',
    'maths learning app gurgaon',
    'online maths tuition gurgaon',
    'class 6 to 10 online maths classes',
    'best online maths classes gurgaon'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/app-preview',
  },

  openGraph: {
    title: 'Online Maths Classes in Gurgaon | My Learning Planet App',

    description:
      'Join online maths classes in Gurgaon with the My Learning Planet app. Live sessions, structured learning, and real-time progress tracking for students.',

    url: 'https://www.mylearningplanet.in/app-preview',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Online Maths Classes in Gurgaon',

    description:
      'Smart online maths classes for Class 6–10 students in Gurgaon. Learn maths easily with our structured learning app.',
  },
}

export default function AppPreview() {
  return <AppPreviewPage />
}