'use client'

import { Play, MessageSquare, Lightbulb } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Play,
      title: 'Click to Start',
      description: 'Simple one-click recording process. No complicated setup required. Just press record and share your story.',
      step: '01',
    },
    {
      icon: MessageSquare,
      title: 'Share Your Story',
      description: 'Record a 2-3 minute video about your journey with our Educational Assistance Program.',
      step: '02',
    },
    {
      icon: Lightbulb,
      title: 'Inspire Others',
      description: 'Your testimonial helps and inspires future students to pursue their educational dreams.',
      step: '03',
    },
  ]

  return (
    <section 
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Recording your testimonial is simple and takes just a few minutes. Here's how it works.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div 
                key={index}
                className="group bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                role="article"
              >
                {/* Step Number */}
                <div className="text-primary font-serif font-bold text-4xl opacity-10 mb-4">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 w-8 h-1 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-primary/5 rounded-lg border border-primary/20 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to share your impact story?
          </p>
          <p className="font-serif font-bold text-foreground text-lg">
            Every testimonial makes a difference
          </p>
        </div>
      </div>
    </section>
  )
}
