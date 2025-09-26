# Header and Footer Control System

This guide shows you how to use the enhanced header and footer system with comprehensive styling control and dynamic content management.

## Quick Start

The system provides two main components:
- `Header` - Enhanced with TypeScript interfaces, multiple layouts, and styling options
- `Footer` - Completely configurable with sections, social media, newsletter, and contact info

## Files Added

- `src/styles/header.css` - Comprehensive header styles with CSS variables
- `src/styles/footer.css` - Complete footer styling system
- `src/types/layout.ts` - TypeScript interfaces and configuration types
- Enhanced `src/components/Header.tsx` and `src/components/Footer.tsx`

## CSS Import

Make sure to import the CSS files in your main layout or page:

```typescript
import '../styles/header.css'
import '../styles/footer.css'
```

## Header Usage Examples

### Basic Header

```tsx
import Header from '../components/Header'

export default function Layout({ children, user }) {
  return (
    <>
      <Header user={user} />
      <main>{children}</main>
    </>
  )
}
```

### Advanced Header Configuration

```tsx
import Header from '../components/Header'
import { HeaderConfig } from '../types/layout'

const headerConfig: Partial<HeaderConfig> = {
  siteName: "My Awesome Site",
  tagline: "Building the future, one pixel at a time",
  headerStyle: "centered", // 'standard' | 'split' | 'centered' | 'stacked' | 'minimal'
  showTaglineInHeader: true,
  
  // Logo configuration
  logo: {
    url: "/logo.png",
    alt: "My Site Logo",
    width: 200,
    height: 60
  },
  
  // Navigation links
  navigationLinks: [
    { label: "Home", url: "/", openInNewTab: false, isActive: true },
    { label: "About", url: "/about", openInNewTab: false, isActive: true },
    { label: "Services", url: "/services", openInNewTab: false, isActive: true, icon: "🚀" },
    { label: "Contact", url: "/contact", openInNewTab: false, isActive: true },
    { label: "External", url: "https://example.com", openInNewTab: true, isActive: true }
  ],
  
  // Header styling
  headerStyling: {
    backgroundColor: "#ffffff",
    textColor: "#333333",
    accentColor: "#3b82f6",
    isSticky: true,
    showShadow: true,
    variant: "default", // 'default' | 'transparent' | 'dark' | 'minimal' | 'bordered'
    logoMaxHeight: "60px",
    enableAnimations: true
  },
  
  // Social media in header
  socialMedia: {
    showInHeader: true,
    facebook: "https://facebook.com/mypage",
    twitter: "https://twitter.com/myhandle",
    instagram: "https://instagram.com/mypage",
    linkedin: "https://linkedin.com/company/mycompany"
  },
  
  // Contact info bar
  headerContact: {
    showContactInfo: true,
    phone: "+1 (555) 123-4567",
    email: "hello@mysite.com",
    address: "123 Main St, City, State"
  },
  
  // Search functionality
  enableSearch: true,
  searchPlaceholder: "Search our site..."
}

export default function Layout({ children, user }) {
  const handleSearch = (query: string) => {
    // Handle search functionality
    console.log('Search query:', query)
  }

  return (
    <>
      <Header 
        user={user} 
        branding={headerConfig}
        onSearchSubmit={handleSearch}
        className="custom-header"
      />
      <main>{children}</main>
    </>
  )
}
```

## Footer Usage Examples

### Basic Footer (using existing structure)

The enhanced Footer component is backward compatible and will render your existing footer structure by default.

```tsx
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

### Advanced Footer Configuration

```tsx
import Footer from '../components/Footer'
import { FooterConfig } from '../types/layout'

const footerConfig: Partial<FooterConfig> = {
  layout: "three-column", // 'standard' | 'centered' | 'minimal' | 'four-column' | 'three-column' | 'two-column' | 'single' | 'company-prominent'
  
  // Branding section
  branding: {
    showLogo: true,
    companyName: "My Awesome Company",
    tagline: "Building the future together",
    description: "We're passionate about creating amazing digital experiences that help businesses grow and thrive in the modern world.",
    logo: {
      url: "/footer-logo.png",
      alt: "Company Logo",
      width: 120,
      height: 40
    }
  },
  
  // Dynamic sections
  sections: [
    {
      id: "company",
      title: "Company",
      showInLayout: true,
      order: 1,
      links: [
        { label: "About Us", url: "/about", isActive: true },
        { label: "Our Team", url: "/team", isActive: true },
        { label: "Careers", url: "/careers", isActive: true, icon: "💼" },
        { label: "Press", url: "/press", isActive: true }
      ]
    },
    {
      id: "products",
      title: "Products",
      showInLayout: true,
      order: 2,
      links: [
        { label: "Web Design", url: "/web-design", isActive: true },
        { label: "Mobile Apps", url: "/mobile-apps", isActive: true },
        { label: "Consulting", url: "/consulting", isActive: true },
        { label: "Support", url: "/support", isActive: true }
      ]
    },
    {
      id: "resources",
      title: "Resources",
      showInLayout: true,
      order: 3,
      links: [
        { label: "Blog", url: "/blog", isActive: true },
        { label: "Documentation", url: "/docs", isActive: true },
        { label: "Help Center", url: "/help", isActive: true },
        { label: "Community", url: "/community", openInNewTab: true, isActive: true }
      ]
    }
  ],
  
  // Social media
  socialMedia: {
    showInFooter: true,
    facebook: "https://facebook.com/mycompany",
    twitter: "https://twitter.com/mycompany",
    instagram: "https://instagram.com/mycompany",
    linkedin: "https://linkedin.com/company/mycompany",
    youtube: "https://youtube.com/c/mycompany",
    github: "https://github.com/mycompany"
  },
  
  // Contact information
  contact: {
    showContact: true,
    companyName: "My Awesome Company",
    address: "123 Business Ave, Suite 100, City, ST 12345",
    phone: "+1 (555) 123-4567",
    email: "hello@mycompany.com",
    hours: "Mon-Fri 9AM-6PM EST"
  },
  
  // Newsletter signup
  newsletter: {
    enabled: true,
    title: "Stay Updated",
    description: "Get the latest news and updates delivered to your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    successMessage: "Thanks for subscribing! Check your email to confirm."
  },
  
  // Styling
  styling: {
    variant: "default", // 'default' | 'light' | 'dark-blue' | 'gradient'
    backgroundColor: "#1f2937",
    textColor: "#e5e7eb",
    accentColor: "#3b82f6",
    enableAnimations: true
  },
  
  // Copyright and legal
  copyright: {
    text: "My Awesome Company. All rights reserved.",
    showYear: true
  },
  
  legalLinks: [
    { label: "Privacy Policy", url: "/privacy", isActive: true },
    { label: "Terms of Service", url: "/terms", isActive: true },
    { label: "Cookie Policy", url: "/cookies", isActive: true }
  ]
}

export default function Layout({ children }) {
  const handleNewsletterSubmit = async (email: string) => {
    // Handle newsletter subscription
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) throw new Error('Subscription failed')
      
      console.log('Newsletter subscription successful')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      throw error // This will show the error state in the component
    }
  }

  return (
    <>
      <main>{children}</main>
      <Footer 
        config={footerConfig}
        onNewsletterSubmit={handleNewsletterSubmit}
        className="custom-footer"
      />
    </>
  )
}
```

## CSS Customization

### Using CSS Variables

Both header and footer use CSS custom properties for easy theming:

```css
:root {
  /* Header customization */
  --header-bg-color: #ffffff;
  --header-text-color: #333333;
  --header-accent-color: #3b82f6;
  --header-max-width: 1200px;
  --header-logo-max-height: 60px;
  
  /* Footer customization */
  --footer-bg-color: #1f2937;
  --footer-text-color: #e5e7eb;
  --footer-accent-color: #3b82f6;
  --footer-max-width: 1200px;
}
```

### Header Layout Variants

The system supports multiple header layouts:

```css
/* Apply different header styles */
.header-style-standard { /* Logo left, nav center, auth right */ }
.header-style-split { /* Logo left, everything else right */ }
.header-style-centered { /* Logo center, nav below */ }
.header-style-stacked { /* Logo top, nav below */ }
.header-style-minimal { /* Simplified layout */ }
```

### Footer Layout Variants

```css
/* Apply different footer layouts */
.footer.layout-standard { /* Auto-fit columns */ }
.footer.layout-centered { /* Single column centered */ }
.footer.layout-four-column { /* Four equal columns */ }
.footer.layout-three-column { /* Three equal columns */ }
.footer.layout-company-prominent { /* Company info prominent */ }
```

### Color Variants

```css
/* Header variants */
.header.transparent { /* Transparent background */ }
.header.dark { /* Dark theme */ }
.header.minimal { /* Minimal styling */ }
.header.bordered { /* Border accent */ }

/* Footer variants */
.footer.light { /* Light theme */ }
.footer.dark-blue { /* Dark blue theme */ }
.footer.gradient { /* Gradient background */ }
```

## Advanced Features

### Responsive Design

Both components are fully responsive with mobile-first design:

- Mobile hamburger menu support (ready for implementation)
- Responsive grid layouts
- Mobile-optimized social icons and contact info
- Flexible navigation that adapts to screen size

### Animation Support

Enable animations for enhanced user experience:

```typescript
// Header animations
headerStyling: {
  enableAnimations: true // Enables slide-down animation
}

// Footer animations
styling: {
  enableAnimations: true // Enables staggered fade-in animations
}
```

### Search Integration

The header supports integrated search functionality:

```typescript
const handleSearch = (query: string) => {
  // Implement search logic
  window.location.href = `/search?q=${encodeURIComponent(query)}`
}

<Header 
  branding={{ enableSearch: true }}
  onSearchSubmit={handleSearch}
/>
```

### Newsletter Integration

The footer includes newsletter signup with state management:

```typescript
const handleNewsletterSubmit = async (email: string) => {
  // Integrate with your email service
  await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}
```

## Migration Guide

### From Old Header

Your existing header will continue to work. To use new features:

1. Import the new types: `import { HeaderConfig } from '../types/layout'`
2. Replace `branding` prop with typed configuration
3. Add CSS import: `import '../styles/header.css'`

### From Old Footer

The new footer is backward compatible. To enable new features:

1. Import types: `import { FooterConfig } from '../types/layout'`
2. Pass configuration via `config` prop instead of hardcoding content
3. Add CSS import: `import '../styles/footer.css'`

## TypeScript Support

Full TypeScript support with:

- Strict type checking for all configuration options
- IntelliSense support in your IDE
- Type guards for validation
- Default configurations to prevent errors

## Performance Optimizations

- Memoized component renders
- CSS custom properties for efficient styling
- Optimized responsive images
- Minimal re-renders with proper dependency arrays

---

## Troubleshooting

### CSS Not Loading

Make sure to import the CSS files in your layout:

```typescript
import '../styles/header.css'
import '../styles/footer.css'
```

### TypeScript Errors

Ensure you're using the proper interfaces:

```typescript
import { HeaderProps, FooterProps } from '../types/layout'
```

### Layout Issues

Check that you're using valid layout types:

- Header: `'standard' | 'split' | 'centered' | 'stacked' | 'minimal'`
- Footer: `'standard' | 'centered' | 'minimal' | 'four-column' | 'three-column' | 'two-column' | 'single' | 'company-prominent'`

This system gives you complete control over your header and footer while maintaining excellent performance and accessibility standards.