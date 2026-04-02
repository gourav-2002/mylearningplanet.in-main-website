import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mylearningplanet.com'),
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XL70DZ253W"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XL70DZ253W');
          `}
        </Script>
        <Header />
        <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
