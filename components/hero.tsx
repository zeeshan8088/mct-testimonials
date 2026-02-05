'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

interface HeroProps {
  onRecordClick: () => void
}

export default function Hero({ onRecordClick }: HeroProps) {
  return (
    <section 
      id="hero"
      className="relative min-h-screen bg-gradient-to-b from-primary/5 to-secondary/30 overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top subtitle */}
        <div className="text-center mb-8 animate-fade-in">
          <p 
            className="text-sm font-medium text-primary mb-4 font-sans"
            role="status"
          >
            Welcome to Maymar Charitable Trust
          </p>
        </div>

        {/* Main heading */}
        <div className="text-center mb-12 space-y-6 animate-fade-in animation-delay-200">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance">
            Share Your Journey With Maymar Charitable Trust
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Your story inspires future scholars. Record a short video testimonial about how our Educational Assistance Program has impacted your life.
          </p>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 bg-white rounded-lg shadow-md overflow-hidden animate-fade-in animation-delay-400">
          <div className="p-6 text-center border-r border-border last:border-r-0">
            <div className="font-serif font-bold text-2xl sm:text-3xl text-primary mb-2">
              33 Years
            </div>
            <div className="text-sm text-muted-foreground font-medium">Of Service</div>
          </div>
          <div className="p-6 text-center border-r border-border last:border-r-0">
            <div className="font-serif font-bold text-2xl sm:text-3xl text-primary mb-2">
              13,000+
            </div>
            <div className="text-sm text-muted-foreground font-medium">Scholarships Awarded</div>
          </div>
          <div className="p-6 text-center">
            <div className="font-serif font-bold text-2xl sm:text-3xl text-primary mb-2">
              3,000+
            </div>
            <div className="text-sm text-muted-foreground font-medium">Graduates Supported</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-in animation-delay-600">
          <Button
            onClick={onRecordClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:gap-2 group gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Start recording your testimonial"
          >
            Record Your Testimonial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground mb-4">
            ✓ Quick & Easy • ✓ Secure Recording • ✓ Your Story Matters
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
