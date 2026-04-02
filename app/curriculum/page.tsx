import type { Metadata } from 'next'
import CurriculumPage from '@/components/CurriculumPage'

export const metadata: Metadata = {
  title: 'Maths Classes in Gurgaon | Structured Curriculum for Class 6–10',

  description:
    'Looking for maths classes in Gurgaon? Explore our structured curriculum with chapter-wise learning, concept clarity, and support from a trusted maths institute near you.',

  keywords: [
    'maths classes in gurgaon',
    'maths institute near me',
    'maths curriculum class 6 to 10',
    'ncert maths curriculum',
    'class 10 maths syllabus',
    'class 9 maths syllabus',
    'structured maths learning gurgaon'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.in/curriculum',
  },

  openGraph: {
    title: 'Maths Classes in Gurgaon | My Learning Planet Curriculum',

    description:
      'Discover structured maths classes in Gurgaon with a clear curriculum, chapter-wise learning, and support from a trusted maths institute near you.',

    url: 'https://www.mylearningplanet.in/curriculum',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Maths Classes in Gurgaon | Structured Learning',

    description:
      'Explore structured maths learning with a clear curriculum and expert guidance for Class 6–10 students in Gurgaon.',
  },
}

export default function Curriculum() {
  return <CurriculumPage />
}