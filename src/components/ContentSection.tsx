import Image from 'next/image'

interface ContentSectionProps {
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

export default function ContentSection({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  buttonText,
  buttonLink,
  backgroundColor = 'transparent'
}: ContentSectionProps) {
  return (
    <section 
      className="content-section"
      style={{ backgroundColor }}
    >
      <div className="content-section-container">
        <div className={`content-section-wrapper ${imagePosition === 'right' ? 'reverse' : ''}`}>
          {/* Image Area */}
          <div className="content-section-image">
            <div className="image-wrapper">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={400}
                className="section-image"
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="content-section-text">
            <div className="text-wrapper">
              <h2 className="section-title">{title}</h2>
              <div 
                className="section-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {buttonText && buttonLink && (
                <div className="section-action">
                  <a href={buttonLink} className="btn btn-primary">
                    {buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
