'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+918025596947" 
              className="hover:opacity-90 transition-opacity flex items-center gap-2"
              aria-label="Call Maymar Charitable Trust"
            >
              <span className="sr-only">Phone:</span>
              +91 80 25569947
            </a>
            <a 
              href="mailto:maymarblr@gmail.com" 
              className="hover:opacity-90 transition-opacity flex items-center gap-2"
              aria-label="Email Maymar Charitable Trust"
            >
              <span className="sr-only">Email:</span>
              msymarbli@gmail.com
            </a>
          </div>
          <div className="flex gap-4" role="list">
            <a href="https://www.facebook.com/maymarcharitabletrust" className="hover:opacity-90 transition-opacity" aria-label="Facebook">
              f
            </a>
            <a href="https://www.instagram.com/maymarcharitabletrust/" className="hover:opacity-90 transition-opacity" aria-label="Instagram">
              insta
            </a>
            <a href="https://www.linkedin.com/company/maymar-charitable-trust/" className="hover:opacity-90 transition-opacity" aria-label="LinkedIn">
              linkedin
            </a>
            <a href="https://www.youtube.com/@MaymarCharitableTrust" className="hover:opacity-90 transition-opacity" aria-label="YouTube">
              ▶
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div 
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl"
            aria-label="Maymar Charitable Trust Logo"
          >
            MCT
          </div>
          <div>
            <h1 className="font-serif font-bold text-primary text-lg">MAYMAR</h1>
            <p className="text-xs text-muted-foreground">CHARITABLE TRUST</p>
          </div>
        </div>

        {/* Navigation and CTA */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              >
                How It Works
              </button>
            </li>
            <li>
              <Link 
                href="https://maymar.org.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              >
                Main Site
              </Link>
            </li>
          </ul>

          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Donate to Maymar Charitable Trust"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Donate</span>
          </Button>
        </div>
      </nav>
    </header>
  )
}
