'use client'

import { useState, useEffect } from 'react'

interface Slide {
  id: number
  image: string
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

interface ImageSliderProps {
  slides: Slide[]
  autoPlay?: boolean
  interval?: number
}

export default function ImageSlider({ slides, autoPlay = true, interval = 5000 }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydration effect
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && autoPlay && slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isHydrated, autoPlay, interval, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <div className="slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === (isHydrated ? currentSlide : 0) ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                {slide.subtitle && (
                  <p className="slide-subtitle">{slide.subtitle}</p>
                )}
                {slide.buttonText && slide.buttonLink && (
                  <a href={slide.buttonLink} className="slide-button btn btn-primary">
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            className="slider-nav prev"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="slider-nav next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            →
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === (isHydrated ? currentSlide : 0) ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
