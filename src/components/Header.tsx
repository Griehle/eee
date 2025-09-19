import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface HeaderProps {
  user?: {
    id: string
    email: string
    firstName?: string
    lastName?: string
  }
  branding?: any // We'll type this properly after generating types
}

export default function Header({ user, branding }: HeaderProps) {
  // Default values if branding is not loaded
  const siteName = branding?.siteName || 'My Website'
  const tagline = branding?.tagline
  const logo = branding?.logo
  const logoAlt = branding?.logoAlt || siteName
  const headerStyle = branding?.headerStyle || 'standard'
  const showTaglineInHeader = branding?.showTaglineInHeader || false
  const navigationLinks = branding?.navigationLinks || [
    { label: 'Home', url: '/', openInNewTab: false, isActive: true },
    { label: 'About', url: '/about', openInNewTab: false, isActive: true },
  ]
  
  // Header styling
  const headerStyling = branding?.headerStyling || {}
  const socialMedia = branding?.socialMedia || {}
  const headerContact = branding?.headerContact || {}
  
  // Generate header styles
  const headerStyleObject = {
    backgroundColor: headerStyling.backgroundColor,
    color: headerStyling.textColor,
    position: headerStyling.isSticky ? 'sticky' as const : 'relative' as const,
    top: headerStyling.isSticky ? 0 : 'auto',
    zIndex: headerStyling.isSticky ? 1000 : 'auto',
    boxShadow: headerStyling.showShadow !== false ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
  }

  // Filter active navigation links
  const activeNavLinks = navigationLinks.filter((link: any) => link.isActive)

  const renderLogo = () => {
    const logoContent = logo && typeof logo === 'object' ? (
      <Image
        src={logo.url}
        alt={logoAlt}
        width={logo.width || 200}
        height={logo.height || 50}
        style={{
          maxHeight: headerStyling.logoMaxHeight || '50px',
          width: 'auto',
          height: 'auto',
        }}
        priority
      />
    ) : (
      <strong>{siteName}</strong>
    )

    return (
      <Link href="/" className="nav-brand">
        <div className="brand-content">
          {logoContent}
          {showTaglineInHeader && tagline && (
            <div className="brand-tagline">{tagline}</div>
          )}
        </div>
      </Link>
    )
  }

  const renderNavigation = () => (
    <div className="nav-menu">
      {activeNavLinks.map((link: any, index: number) => (
        <Link
          key={index}
          href={link.url}
          className="nav-link"
          target={link.openInNewTab ? '_blank' : undefined}
          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )

  const renderSocialMedia = () => {
    if (!socialMedia.showInHeader) return null

    return (
      <div className="nav-social">
        {socialMedia.facebook && (
          <Link href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
            📘
          </Link>
        )}
        {socialMedia.twitter && (
          <Link href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
            🐦
          </Link>
        )}
        {socialMedia.instagram && (
          <Link href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
            📷
          </Link>
        )}
        {socialMedia.linkedin && (
          <Link href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
            💼
          </Link>
        )}
        {socialMedia.youtube && (
          <Link href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
            📺
          </Link>
        )}
      </div>
    )
  }

  const renderContactInfo = () => {
    if (!headerContact.showContactInfo) return null

    return (
      <div className="nav-contact">
        {headerContact.phone && (
          <span className="contact-item">
            📞 {headerContact.phone}
          </span>
        )}
        {headerContact.email && (
          <span className="contact-item">
            ✉️ {headerContact.email}
          </span>
        )}
        {headerContact.address && (
          <span className="contact-item">
            📍 {headerContact.address}
          </span>
        )}
      </div>
    )
  }

  const renderAuthSection = () => (
    <div className="nav-auth">
      {user ? (
        <>
          <span className="nav-welcome">
            Welcome, {user.firstName || user.email}!
          </span>
          <Link href="/profile" className="nav-link">Profile</Link>
          <Link href="/api/users/logout" className="nav-link logout">
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="nav-link">Login</Link>
          <Link href="/register" className="nav-link register">Register</Link>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Custom CSS if provided */}
      {headerStyling.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: headerStyling.customCSS }} />
      )}
      
      <header className={`header header-style-${headerStyle}`} style={headerStyleObject}>
        {/* Contact Info Bar (if enabled) */}
        {renderContactInfo()}
        
        <nav className="nav">
          {headerStyle === 'centered' ? (
            <>
              <div className="nav-section nav-left">
                {renderSocialMedia()}
              </div>
              <div className="nav-section nav-center">
                {renderLogo()}
              </div>
              <div className="nav-section nav-right">
                {renderAuthSection()}
              </div>
              <div className="nav-row-2">
                {renderNavigation()}
              </div>
            </>
          ) : headerStyle === 'stacked' ? (
            <>
              <div className="nav-row-1">
                <div className="nav-center">
                  {renderLogo()}
                </div>
                <div className="nav-right">
                  {renderSocialMedia()}
                  {renderAuthSection()}
                </div>
              </div>
              <div className="nav-row-2">
                {renderNavigation()}
              </div>
            </>
          ) : (
            // Standard and Split layouts
            <>
              <div className="nav-left">
                {renderLogo()}
              </div>
              <div className="nav-center">
                {headerStyle === 'standard' && renderNavigation()}
              </div>
              <div className="nav-right">
                {headerStyle === 'split' && renderNavigation()}
                {renderSocialMedia()}
                {renderAuthSection()}
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  )
}
