import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Best Maths Tuition Near Me | Structured Learning That Delivers Results',

  description: 'Searching for maths tuition near me? My Learning Planet offers structured learning, expert guidance, and real progress tracking — a smarter alternative to traditional mathematics tuition near me for students in Classes 6–10.',

  keywords: [
    'maths tuition near me',
    'math coaching near me',
    'online maths classes',
    'math classes for class 6 to 10',
    'my learning planet'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in',
  },

  openGraph: {
    title: 'Best Maths Tuition Near Me | Structured Learning That Delivers Results',

    description: 'Looking for maths tuition near you? Discover structured learning with expert teachers and real progress tracking at My Learning Planet.',

    url: 'https://www.mylearningplanet.in',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Best Maths Tuition Near Me | Structured Learning That Delivers Results',
    description: 'Structured maths learning with expert guidance for Classes 6–10.',
  },
}

export default function Home() {
  return <HomePage />
}
