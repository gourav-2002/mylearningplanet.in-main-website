import type { Metadata } from 'next'
import HowItWorksPage from '@/components/HowItWorksPage'

export const metadata: Metadata = {
  title: 'Best Maths Coaching in Gurgaon | How Our Classes Work',

  description:
    'Curious about the best maths coaching in Gurgaon? Discover how our step-by-step learning system works, from classes to progress tracking, making us one of the best maths classes near you.',

  keywords: [
    'best maths coaching in gurgaon',
    'best maths classes near me',
    'how maths classes work',
    'math learning system',
    'structured maths coaching',
    'online maths classes gurgaon'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/how-it-works',
  },

  openGraph: {
    title: 'Best Maths Coaching in Gurgaon | How It Works',

    description:
      'Explore how our structured learning system makes us one of the best maths coaching options in Gurgaon, with clear steps and consistent progress tracking.',

    url: 'https://www.mylearningplanet.in/how-it-works',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Best Maths Coaching in Gurgaon',

    description:
      'See how our maths classes work step by step, from learning to progress tracking, for students in Gurgaon.',
  },
}

export default function HowItWorks() {
  return <HowItWorksPage />
}