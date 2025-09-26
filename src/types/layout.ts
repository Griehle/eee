// ==========================================================================
// LAYOUT TYPES
// TypeScript interfaces for header and footer configuration
// ==========================================================================

// User Authentication Interface
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}

// ==========================================================================
// HEADER INTERFACES
// ==========================================================================

// Navigation Link Interface
export interface NavigationLink {
  label: string
  url: string
  openInNewTab: boolean
  isActive: boolean
  children?: NavigationLink[] // For dropdown menus
  icon?: string // For icons
  className?: string // Custom CSS classes
}

// Logo/Brand Interface
export interface BrandLogo {
  url: string
  alt?: string
  width?: number
  height?: number
}

// Social Media Configuration
export interface SocialMediaConfig {
  showInHeader?: boolean
  showInFooter?: boolean
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  github?: string
  tiktok?: string
  pinterest?: string
}

// Header Contact Information
export interface HeaderContact {
  showContactInfo: boolean
  phone?: string
  email?: string
  address?: string
  hours?: string
}

// Header Layout Types
export type HeaderLayout = 
  | 'standard'    // Logo left, nav center, auth right
  | 'split'       // Logo left, everything else right
  | 'centered'    // Logo center, nav below
  | 'stacked'     // Logo top, nav below
  | 'minimal'     // Simplified layout

// Header Style Variants
export type HeaderVariant = 
  | 'default'
  | 'transparent'
  | 'dark'
  | 'minimal'
  | 'bordered'
  | 'gradient'

// Header Styling Configuration
export interface HeaderStyling {
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  shadowColor?: string
  accentColor?: string
  isSticky?: boolean
  showShadow?: boolean
  logoMaxHeight?: string
  customCSS?: string
  variant?: HeaderVariant
  enableAnimations?: boolean
}

// Complete Header Configuration
export interface HeaderConfig {
  siteName: string
  tagline?: string
  logo?: BrandLogo
  logoAlt?: string
  headerStyle: HeaderLayout
  showTaglineInHeader: boolean
  navigationLinks: NavigationLink[]
  headerStyling: HeaderStyling
  socialMedia: SocialMediaConfig
  headerContact: HeaderContact
  enableSearch?: boolean
  searchPlaceholder?: string
  mobileBreakpoint?: number
}

// Header Props Interface
export interface HeaderProps {
  user?: User
  branding?: Partial<HeaderConfig>
  className?: string
  onSearchSubmit?: (query: string) => void
  onMobileMenuToggle?: (isOpen: boolean) => void
}

// ==========================================================================
// FOOTER INTERFACES
// ==========================================================================

// Footer Layout Types
export type FooterLayout = 
  | 'standard'           // Auto-fit columns
  | 'centered'           // Single column centered
  | 'minimal'            // Two columns
  | 'four-column'        // Four equal columns
  | 'three-column'       // Three equal columns
  | 'two-column'         // Two equal columns
  | 'single'             // Single column
  | 'company-prominent'  // Company info takes more space

// Footer Color Variants
export type FooterVariant = 
  | 'default'    // Dark footer
  | 'light'      // Light footer
  | 'dark-blue'  // Dark blue footer
  | 'gradient'   // Gradient footer

// Footer Section Interface
export interface FooterSection {
  id: string
  title: string
  content?: string
  links?: FooterLink[]
  showInLayout: boolean
  order: number
  customHTML?: string
}

// Footer Link Interface
export interface FooterLink {
  label: string
  url: string
  openInNewTab?: boolean
  icon?: string
  isActive?: boolean
}

// Footer Contact Information
export interface FooterContact {
  showContact: boolean
  companyName?: string
  address?: string
  phone?: string
  email?: string
  hours?: string
}

// Newsletter Configuration
export interface NewsletterConfig {
  enabled: boolean
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  apiEndpoint?: string
}

// Footer Branding
export interface FooterBranding {
  showLogo: boolean
  logo?: BrandLogo
  companyName: string
  tagline?: string
  description?: string
}

// Footer Styling Configuration
export interface FooterStyling {
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  accentColor?: string
  linkColor?: string
  linkHoverColor?: string
  variant?: FooterVariant
  customCSS?: string
  enableAnimations?: boolean
}

// Complete Footer Configuration
export interface FooterConfig {
  layout: FooterLayout
  branding: FooterBranding
  sections: FooterSection[]
  socialMedia: SocialMediaConfig
  contact: FooterContact
  newsletter: NewsletterConfig
  styling: FooterStyling
  copyright: {
    text: string
    showYear: boolean
    customText?: string
  }
  legalLinks?: FooterLink[]
}

// Footer Props Interface
export interface FooterProps {
  config?: Partial<FooterConfig>
  className?: string
  onNewsletterSubmit?: (email: string) => void
}

// ==========================================================================
// UTILITY INTERFACES
// ==========================================================================

// Responsive Display Options
export interface ResponsiveDisplay {
  hideOnMobile?: boolean
  hideOnTablet?: boolean
  hideOnDesktop?: boolean
}

// Animation Options
export interface AnimationConfig {
  enabled: boolean
  type?: 'fade' | 'slide' | 'zoom' | 'bounce'
  duration?: number
  delay?: number
}

// SEO Configuration
export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
}

// ==========================================================================
// HELPER TYPES
// ==========================================================================

// Theme Configuration
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

// Layout Breakpoints
export interface Breakpoints {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

// Complete Site Configuration
export interface SiteConfig {
  theme: ThemeConfig
  header: HeaderConfig
  footer: FooterConfig
  breakpoints: Breakpoints
  seo: SEOConfig
  features: {
    enableDarkMode?: boolean
    enableSearch?: boolean
    enableNewsletter?: boolean
    enableAnalytics?: boolean
  }
}

// ==========================================================================
// DEFAULT CONFIGURATIONS
// ==========================================================================

// Default Header Configuration
export const defaultHeaderConfig: Partial<HeaderConfig> = {
  siteName: 'My Website',
  headerStyle: 'standard',
  showTaglineInHeader: false,
  navigationLinks: [
    { label: 'Home', url: '/', openInNewTab: false, isActive: true },
    { label: 'About', url: '/about', openInNewTab: false, isActive: true }
  ],
  headerStyling: {
    isSticky: false,
    showShadow: true,
    variant: 'default',
    enableAnimations: true
  },
  socialMedia: {
    showInHeader: false
  },
  headerContact: {
    showContactInfo: false
  }
}

// Default Footer Configuration  
export const defaultFooterConfig: Partial<FooterConfig> = {
  layout: 'standard',
  branding: {
    showLogo: true,
    companyName: 'My Website'
  },
  sections: [
    {
      id: 'about',
      title: 'About',
      content: 'Built with Love and bits of frustration occasionally',
      showInLayout: true,
      order: 1
    },
    {
      id: 'links',
      title: 'Quick Links',
      links: [
        { label: 'Home', url: '/', isActive: true },
        { label: 'About', url: '/about', isActive: true }
      ],
      showInLayout: true,
      order: 2
    },
    {
      id: 'contact',
      title: 'Contact',
      content: 'Email: hello@mywebsite.com',
      showInLayout: true,
      order: 3
    }
  ],
  socialMedia: {
    showInFooter: false
  },
  contact: {
    showContact: false
  },
  newsletter: {
    enabled: false
  },
  styling: {
    variant: 'default',
    enableAnimations: false
  },
  copyright: {
    text: 'My Website. All rights reserved.',
    showYear: true
  }
}

// ==========================================================================
// TYPE GUARDS
// ==========================================================================

export const isValidHeaderLayout = (layout: string): layout is HeaderLayout => {
  return ['standard', 'split', 'centered', 'stacked', 'minimal'].includes(layout)
}

export const isValidFooterLayout = (layout: string): layout is FooterLayout => {
  return ['standard', 'centered', 'minimal', 'four-column', 'three-column', 'two-column', 'single', 'company-prominent'].includes(layout)
}

export const isValidHeaderVariant = (variant: string): variant is HeaderVariant => {
  return ['default', 'transparent', 'dark', 'minimal', 'bordered', 'gradient'].includes(variant)
}

export const isValidFooterVariant = (variant: string): variant is FooterVariant => {
  return ['default', 'light', 'dark-blue', 'gradient'].includes(variant)
}