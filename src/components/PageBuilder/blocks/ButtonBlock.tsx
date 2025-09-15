import React from 'react'
import { ContentBlock } from '@/payload-types'
import Link from 'next/link'

interface ButtonBlockProps {
  block: ContentBlock
}

export default function ButtonBlock({ block }: ButtonBlockProps) {
  const { button } = block
  
  if (!button?.text || !button?.url) {
    return null
  }

  const getButtonClasses = () => {
    const baseClasses = 'inline-block px-6 py-3 font-semibold text-center no-underline transition-all duration-200 rounded'
    
    let styleClasses = ''
    switch (button.style) {
      case 'primary':
        styleClasses = 'bg-blue-600 text-white hover:bg-blue-700'
        break
      case 'secondary':
        styleClasses = 'bg-gray-600 text-white hover:bg-gray-700'
        break
      case 'outline':
        styleClasses = 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        break
      case 'ghost':
        styleClasses = 'text-blue-600 hover:bg-blue-50'
        break
      default:
        styleClasses = 'bg-blue-600 text-white hover:bg-blue-700'
    }

    let sizeClasses = ''
    switch (button.size) {
      case 'sm':
        sizeClasses = 'px-4 py-2 text-sm'
        break
      case 'lg':
        sizeClasses = 'px-8 py-4 text-lg'
        break
      default:
        sizeClasses = 'px-6 py-3'
    }

    return `${baseClasses} ${styleClasses} ${sizeClasses}`
  }

  const buttonElement = (
    <span className={getButtonClasses()}>
      {button.text}
    </span>
  )

  if (button.url.startsWith('http') || button.url.startsWith('//')) {
    return (
      <a 
        href={button.url}
        target={button.openInNewTab ? '_blank' : undefined}
        rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
        className="button-block"
      >
        {buttonElement}
      </a>
    )
  }

  return (
    <Link href={button.url} className="button-block">
      {buttonElement}
    </Link>
  )
}