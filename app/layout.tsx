import React from "react"
import type { Metadata, Viewport } from 'next'
import { Merriweather, Inter } from 'next/font/google'

import './globals.css'
import AccessibilityWrapper from '@/components/accessibility-wrapper'

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Maymar Charitable Trust - Video Testimonials',
  description: 'Share your journey with Maymar Charitable Trust. Record a video testimonial about how our Educational Assistance Program has impacted your life.',
  generator: 'v0.app',
  openGraph: {
    title: 'Maymar Charitable Trust - Video Testimonials',
    description: 'Share your story and inspire future scholars',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#8B0000',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AccessibilityWrapper>
          {children}
        </AccessibilityWrapper>
      </body>
    </html>
  )
}
