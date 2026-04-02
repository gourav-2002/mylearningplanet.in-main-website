import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Maths Tuition Near You | Book a Free Demo Today',

  description:
    'Searching for maths tuition near you? Contact My Learning Planet to book a free demo and explore structured mathematics tutoring near you for Class 6–10 students.',

  keywords: [
    'maths tuition near me',
    'mathematics tutoring near me',
    'math coaching near me',
    'math home tuition',
    'online maths classes near me',
    'class 6 to 10 maths tuition'
  ],

  alternates: {
    canonical: 'https://www.mylearningplanet.com/contact',
  },

  openGraph: {
    title: 'Maths Tuition Near You | My Learning Planet',

    description:
      'Get in touch with My Learning Planet to book a free demo and start structured maths tuition near you for better learning outcomes.',

    url: 'https://www.mylearningplanet.com/contact',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Maths Tuition Near You',

    description:
      'Book a free demo for structured maths tuition and personalized learning support near you.',
  },
}

export default function Contact() {
  return <ContactPage />
}