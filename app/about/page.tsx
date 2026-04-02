import type { Metadata } from 'next'
import AboutUsPage from '@/components/AboutUsPage'

export const metadata: Metadata = {
  title: 'Best Maths Tutor in Gurgaon | About My Learning Planet',

  description:
    'Looking for the best maths tutor in Gurgaon? Learn how My Learning Planet offers structured maths tuition in Gurgaon with personalized support for Class 6–10 students.',

  keywords: [
    'best maths tutor in gurgaon',
    'maths tuition in gurgaon',
    'math coaching gurgaon',
    'class 6 to 10 maths tuition gurgaon',
    'online maths tutor gurgaon',
    'structured maths learning gurgaon'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.com/about',
  },

  openGraph: {
    title: 'Best Maths Tutor in Gurgaon | My Learning Planet',

    description:
      'Discover My Learning Planet, offering structured maths tuition in Gurgaon with personalized guidance for Class 6–10 students.',

    url: 'https://www.mylearningplanet.com/about',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Best Maths Tutor in Gurgaon',

    description:
      'Structured maths tuition in Gurgaon with expert guidance for Class 6–10 students.',
  },
}

export default function About() {
  return <AboutUsPage />
}