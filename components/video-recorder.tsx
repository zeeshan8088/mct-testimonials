'use client'

import { useState, useCallback } from 'react'
import { Upload, Check, Loader2, Video } from 'lucide-react'
import { Button } from './ui/button'
import { supabase } from '@/lib/supabase'

type UploadState = 'idle' | 'selected' | 'submitted'

interface VideoRecorderProps {
  isOpen: boolean
  onClose: () => void
}

export default function VideoRecorder({ isOpen, onClose }: VideoRecorderProps) {
  const [state, setState] = useState<UploadState>('idle')
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Announce status for accessibility
  const announceStatus = useCallback((message: string) => {
    const announcement = new SpeechSynthesisUtterance(message)
    announcement.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(announcement)
  }, [])

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file')
      announceStatus('Error: Please select a valid video file')
      return
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      setError('Video file is too large. Maximum size is 100MB')
      announceStatus('Error: Video file is too large. Maximum size is 100MB')
      return
    }

    setSelectedVideo(file)
    setVideoPreviewUrl(URL.createObjectURL(file))
    setState('selected')
    setError(null)
    announceStatus(`Video selected: ${file.name}. You can now review and submit.`)
  }

  // Reset/Select another video
  const selectAnotherVideo = useCallback(() => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl)
    }
    setSelectedVideo(null)
    setVideoPreviewUrl(null)
    setState('idle')
    setError(null)
    setUploadError(null)
    setUploadProgress('')
  }, [videoPreviewUrl])

  // Upload video
  const handleUpload = async () => {
    if (!selectedVideo) return
    
    setIsSubmitting(true)
    setUploadError(null)
    setUploadProgress('Uploading video...')
    announceStatus('Uploading your testimonial. Please wait.')
    
    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', selectedVideo)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      formData.append('folder', 'mct_uploads')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Failed to upload video')
      }
      
      const data = await response.json()
      const videoUrl = data.secure_url
      
      console.log('Video uploaded to Cloudinary:', videoUrl)
      
      setUploadProgress('Saving testimonial...')
      
      // Save to Supabase
      const { error } = await supabase
        .from('testimonials')
        .insert([
          {
            video_url: videoUrl,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Supabase error:', error)
        throw new Error('Failed to save testimonial')
      }
      
      console.log('Testimonial saved to Supabase successfully')
      
      announceStatus('Your testimonial has been submitted successfully! Thank you.')
      setState('submitted')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit testimonial'
      setUploadError(message)
      announceStatus(`Error: ${message}. Please try again.`)
      console.error('Upload error:', error)
    } finally {
      setIsSubmitting(false)
      setUploadProgress('')
    }
  }

  // Cleanup on unmount
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="uploader-title"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex items-center justify-between border-b">
          <h2 id="uploader-title" className="text-2xl font-serif font-bold">
            Share Your Testimonial
          </h2>
          {state !== 'submitted' && (
            <button
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary/80 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Close uploader"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {state === 'submitted' ? (
            // Success state
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your testimonial has been submitted successfully and will be reviewed by our team.
              </p>
              <Button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90"
              >
                Close
              </Button>
            </div>
          ) : state === 'selected' && selectedVideo ? (
            // Video preview and submit
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                  Review Your Video
                </h3>
                <div className="bg-secondary/30 p-3 rounded-lg mb-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>File:</strong> {selectedVideo.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Size:</strong> {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                {videoPreviewUrl && (
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="w-full rounded-lg bg-black"
                    aria-label="Your selected testimonial video"
                  />
                )}
              </div>

              {/* Upload Progress */}
              {uploadProgress && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm" role="status">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploadProgress}
                  </div>
                </div>
              )}

              {/* Error */}
              {uploadError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
                  {uploadError}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={selectAnotherVideo}
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent"
                  disabled={isSubmitting}
                >
                  <Upload className="w-4 h-4" />
                  Choose Different Video
                </Button>
                
                <Button
                  onClick={handleUpload}
                  className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Submit Testimonial'
                  )}
                </Button>
              </div>

              {/* Privacy Notice */}
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Privacy Notice:</strong> Your testimonial will be reviewed by MCT administration before publication.
                </p>
              </div>
            </div>
          ) : (
            // Upload interface
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      Upload Your Video Testimonial
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Record your testimonial on your phone or camera, then upload it here
                    </p>
                  </div>

                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    aria-label="Upload video file"
                  />
                  
                  <Button
                    onClick={() => document.getElementById('video-upload')?.click()}
                    className="bg-primary hover:bg-primary/90 gap-2"
                    size="lg"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Video File
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Supported formats: MP4, MOV, AVI, WebM • Max size: 100MB
                  </p>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
                  {error}
                </div>
              )}

              {/* Tips */}
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-foreground font-medium mb-2">
                  💡 Recording Tips:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keep your video between 2-3 minutes</li>
                  <li>• Record in landscape mode for best quality</li>
                  <li>• Speak clearly and naturally about your journey with MCT</li>
                  <li>• Find a quiet location with good lighting</li>
                  <li>• You can use your phone's camera or any video camera</li>
                </ul>
              </div>

              {/* Cancel Button */}
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}