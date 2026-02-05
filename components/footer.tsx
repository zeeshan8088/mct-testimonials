'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground mt-20 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Organization Info */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Maymar Charitable Trust</h3>
            <p className="text-sm opacity-90 mb-4">Building Lives With Compassion</p>
            <p className="text-xs opacity-75">33 years of dedicated service to education</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="https://maymar.org.in" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                >
                  Main Website
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                >
                  About Our Program
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                >
                  Impact Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="tel:+918025596947" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                  aria-label="Call Maymar Charitable Trust"
                >
                  +91 80 25596947
                </a>
              </li>
              <li>
                <a 
                  href="mailto:maymarblr@gmail.com" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                  aria-label="Email Maymar Charitable Trust"
                >
                  maymarblr@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif font-bold text-sm mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm flex gap-4">
              <li>
                <a 
                  href="#" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                  aria-label="Follow on Facebook"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                  aria-label="Follow on Instagram"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                  aria-label="Follow on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-75 text-center md:text-left">
            © {currentYear} Maymar Charitable Trust. All rights reserved.
          </p>
          <p className="text-xs opacity-75">
            Privacy Notice: Your testimonial will be reviewed by MCT administration
          </p>
        </div>
      </div>
    </footer>
  )
}
