import React from 'react'
import { ContentBlock } from '@/payload-types'

interface VideoBlockProps {
  block: ContentBlock
}

export default function VideoBlock({ block }: VideoBlockProps) {
  const { video } = block

  if (!video?.url) {
    return (
      <div className="video-block">
        <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
          <p>No video URL provided</p>
          <small>Please add a video URL to display content</small>
        </div>
      </div>
    )
  }

  // Clean up HTML entities in the URL
  const cleanUrl = video.url.replace(/&amp;/g, '&')

  // Get size and aspect ratio settings
  const videoSize = video.size || 'large'
  const aspectRatio = video.aspectRatio || '16:9'

  // Size mappings
  const sizeStyles = {
    small: { maxWidth: '400px', width: '100%' },
    medium: { maxWidth: '600px', width: '100%' },
    large: { maxWidth: '800px', width: '100%' },
    xl: { maxWidth: '1000px', width: '100%' },
    full: { maxWidth: '100%', width: '100%' },
  }

  // Aspect ratio mappings to padding-bottom percentages
  const aspectRatioStyles = {
    '16:9': '56.25%',  // 9/16 * 100
    '4:3': '75%',      // 3/4 * 100
    '21:9': '42.86%',  // 9/21 * 100
    '1:1': '100%',     // 1/1 * 100
    '9:16': '177.78%', // 16/9 * 100
  }

  const containerStyle = {
    ...sizeStyles[videoSize as keyof typeof sizeStyles],
    margin: '0 auto',
  }

  const paddingBottom = aspectRatioStyles[aspectRatio as keyof typeof aspectRatioStyles]

  // Check if it's a Vimeo embed URL
  const isVimeoEmbed = cleanUrl.includes('player.vimeo.com')
  const isYouTubeEmbed = cleanUrl.includes('youtube.com/embed') || cleanUrl.includes('youtu.be')
  
  // If it's an embed URL (Vimeo, YouTube, etc.), use iframe
  if (isVimeoEmbed || isYouTubeEmbed) {
    return (
      <div className="video-block">
        <div style={containerStyle}>
          <div className="video-wrapper" style={{ position: 'relative', paddingBottom, height: 0, overflow: 'hidden' }}>
            <iframe
              src={cleanUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      </div>
    )
  }

  // For direct video files, use HTML5 video element
  return (
    <div className="video-block">
      <div style={containerStyle}>
        <video
          src={cleanUrl}
          controls={video.controls !== false}
          autoPlay={video.autoplay === true}
          loop={video.loop === true}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
