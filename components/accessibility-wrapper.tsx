'use client'

import React from "react"

import { useEffect, useState } from 'react'

export default function AccessibilityWrapper({ children }: { children: React.ReactNode }) {
  const [liveRegionMessage, setLiveRegionMessage] = useState('')

  useEffect(() => {
    // Listen for custom accessibility announcements
    const handleAnnounce = (event: CustomEvent) => {
      setLiveRegionMessage(event.detail.message)
      // Clear after announcement
      setTimeout(() => setLiveRegionMessage(''), 1000)
    }

    window.addEventListener('accessibility:announce', handleAnnounce as EventListener)
    return () => {
      window.removeEventListener('accessibility:announce', handleAnnounce as EventListener)
    }
  }, [])

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded focus:font-bold"
      >
        Skip to main content
      </a>

      {/* ARIA Live Region for dynamic announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveRegionMessage}
      </div>

      {/* ARIA Alert Region for important messages */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Main content wrapper */}
      <div id="main-content">
        {children}
      </div>
    </>
  )
}
