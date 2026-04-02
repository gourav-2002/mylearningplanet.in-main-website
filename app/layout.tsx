import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Learning Planet',
  description: 'India\'s most structured math learning platform for Classes 6–10.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
