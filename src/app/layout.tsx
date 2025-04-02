import type { Metadata, Viewport } from 'next'
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FixedNavArrow from './components/FixedNavArrow'
import { AnimationProvider } from './context/AnimationContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Portfolio | Professional Web Developer',
  description: 'Personal portfolio website showcasing development projects, skills, and professional experience.',
  keywords: 'web developer, portfolio, frontend developer, backend developer, full stack developer, programmer',
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
    title: 'Portfolio | Professional Web Developer',
    description: 'Personal portfolio website showcasing development projects, skills, and professional experience.',
    siteName: 'Developer Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourtwitterhandle',
    images: '/og-image.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background-primary">
        <AnimationProvider>
          <Header />
          <FixedNavArrow />
          {children}
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  )
} 