import type { Metadata } from 'next'
import FAQPage from '@/components/FAQPage'

export const metadata: Metadata = {
  title: 'Maths Coaching in Gurgaon | FAQs About Classes & Tuition',

  description:
    'Have questions about maths coaching in Gurgaon? Find clear answers about our classes, fees, curriculum, and how our maths tuition near you helps students learn better.',

  keywords: [
    'maths coaching in gurgaon',
    'maths tuition near me',
    'online maths classes',
    'maths learning platform',
    'math coaching faq',
    'class 6 to 10 maths tuition'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.com/faq',
  },

  openGraph: {
    title: 'Maths Coaching in Gurgaon | My Learning Planet FAQs',

    description:
      'Explore answers to common questions about maths coaching in Gurgaon, including classes, curriculum, and maths tuition options near you.',

    url: 'https://www.mylearningplanet.com/faq',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Maths Coaching in Gurgaon | FAQs',

    description:
      'Get answers about maths classes, fees, and tuition options for students in Gurgaon.',
  },
}

export default function FAQ() {
  return <FAQPage />
}