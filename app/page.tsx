'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import VideoRecorder from '@/components/video-recorder'
import Footer from '@/components/footer'

export default function Page() {
  const [isRecorderOpen, setIsRecorderOpen] = useState(false)

  const openRecorder = () => {
    // Announce for screen readers
    const announcement = new SpeechSynthesisUtterance(
      'Opening video recorder. Please allow camera and microphone permissions when prompted.'
    )
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(announcement)
    setIsRecorderOpen(true)
  }

  const closeRecorder = () => {
    setIsRecorderOpen(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Hero onRecordClick={openRecorder} />
        <HowItWorks />
      </main>
      <Footer />
      <VideoRecorder isOpen={isRecorderOpen} onClose={closeRecorder} />
    </>
  )
}
