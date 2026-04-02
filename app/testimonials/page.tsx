import type { Metadata } from 'next'
import TestimonialsPage from '@/components/TestimonialsPage'

export const metadata: Metadata = {
  title: 'Best Maths Classes Near You | Real Student Reviews & Results',

  description:
    'Looking for the best maths classes near you? Read real reviews from parents and students and see why many consider us the best maths tutor in Gurgaon.',

  keywords: [
    'best maths classes near me',
    'best maths tutor in gurgaon',
    'math coaching reviews',
    'student testimonials',
    'maths classes gurgaon reviews',
    'parent reviews maths tuition'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/testimonials',
  },

  openGraph: {
    title: 'Best Maths Classes Near You | My Learning Planet Reviews',

    description:
      'Explore real testimonials from students and parents and discover why we are trusted as one of the best maths tutors in Gurgaon.',

    url: 'https://www.mylearningplanet.in/testimonials',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Best Maths Classes Near You | Reviews',

    description:
      'See what parents and students say about our maths classes and learning experience in Gurgaon.',
  },
}

export default function Testimonials() {
  return <TestimonialsPage />
}