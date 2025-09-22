# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Payload CMS website** with a sophisticated **WPBakery-style page builder system**. It's built on **Next.js 15** with **React 19** and uses **SQLite** as the database. The core feature is a comprehensive drag-and-drop page builder that allows creating complex websites through the admin interface without coding.

## Development Commands

### Essential Commands
```bash
# Start development server (primary command)
pnpm dev

# Build for production  
pnpm build

# Start production server
pnpm start

# Generate TypeScript types (run after schema changes)
pnpm generate:types

# Generate import map (run after moving files)
pnpm generate:importmap

# Run all tests (integration + e2e)
pnpm test

# Run integration tests only
pnpm test:int

# Run end-to-end tests only
pnpm test:e2e

# Clean development build (when having issues)
pnpm devsafe

# Lint code
pnpm lint

# Access Payload CLI directly
pnpm payload
```

### Database & Admin Access
- **Development server**: `http://localhost:3000`
- **Admin panel**: `http://localhost:3000/admin`
- **Database**: SQLite file at `./my-website.db`

## High-Level Architecture

### Core System Design

This project implements a **headless CMS with visual page building capabilities**:

1. **Payload CMS Backend** - Handles content management, admin interface, and API
2. **Page Builder System** - Visual drag-and-drop interface similar to WPBakery
3. **Next.js Frontend** - Server-side rendering with React components
4. **Content Architecture** - Three-tier content system for maximum flexibility

### Three-Tier Content System

The page builder uses a sophisticated three-tier architecture:

```
Pages (Top Level)
├── Direct Page Building - Blocks added directly to page
├── Content Blocks - Reusable components with complex configurations  
└── Page Templates - Complete pre-built layouts
```

**Content Blocks** (`/src/collections/ContentBlocks.ts`):
- 30+ block types (CTA, features, galleries, forms, etc.)
- Complex styling system with animations and responsive options
- Reusable across multiple pages

**Page Templates** (`/src/collections/PageTemplates.ts`):
- Pre-built page layouts using content blocks
- Template gallery with categories (Homepage, About, Contact, etc.)
- Version control and metadata tracking

**Pages** (`/src/collections/Pages.ts`):
- Template loading system with hooks
- Page builder field with three block types: contentBlock, richText, customHTML
- Draft/publish workflow with versioning

### Key Collections Structure

```typescript
// Core Collections
- Users: Authentication and roles
- Media: File management with categories and metadata
- Pages: Page builder with template system
- Posts: Blog/content system
- ContentBlocks: Reusable page builder components
- PageTemplates: Template library system

// Content Collections  
- Categories, Services, TeamMembers, Testimonials
- HomeSlider, HomeSection: Homepage components

// Configuration
- HomePage (global): Homepage settings
- SiteBranding (global): Site-wide branding
```

### Page Builder Block System

The system includes 30+ block types organized in categories:

**Layout Blocks**: Row, Column, Section (12-column grid)
**Content Elements**: Text, Heading, Image, Gallery, Video, Quote, Button, Icon Box
**Interactive Elements**: Accordion, Tabs, Carousel, Contact Form, Google Maps
**Data Display**: Features List, Statistics, Team Grid, Posts Grid
**Visual Elements**: Call-to-Action, Progress Bar, Separator
**Advanced**: Custom HTML/CSS injection

### Styling & Animation System

Each block includes comprehensive styling options:
- **Spacing**: Margins, padding
- **Backgrounds**: Colors, images, gradients, overlays
- **Borders**: Width, style, color, radius
- **Typography**: Alignment, colors, sizes, weights
- **Effects**: Box shadows, entrance animations
- **Responsive**: Device-specific visibility controls
- **Custom**: CSS classes and code injection

### Template Loading Mechanism

The template system uses Payload hooks for seamless content loading:

```typescript
// Before change hook in Pages collection
beforeChange: [
  async ({ data, req }) => {
    if (data.templateSelector?.useTemplate && data.templateSelector?.template) {
      // Fetch template and load pageBuilder content
      const template = await req.payload.findByID({
        collection: 'page-templates',
        id: templateId,
      })
      if (template?.pageBuilder && !data.pageBuilder?.length) {
        data.pageBuilder = template.pageBuilder
      }
    }
  }
]
```

## Development Guidelines

### Page Builder Development
- **Content blocks** are the primary building components - always prefer creating reusable blocks over one-off solutions
- **Templates** should be created for common page types to ensure consistency
- **Custom HTML blocks** are available for edge cases requiring custom code
- Always test responsive behavior on multiple device sizes

### Content Strategy
- Create content blocks first for repeated elements (heroes, CTAs, feature lists)
- Use templates for page types that will be repeated (landing pages, service pages)
- Leverage the styling system before writing custom CSS
- Follow the three-tier system: Templates → Content Blocks → Direct Page Building

### Database Considerations
- Uses SQLite for development - file located at `./my-website.db`
- Generate types after any schema changes: `pnpm generate:types`
- Content is versioned with draft/publish workflow
- Media files are handled through Payload's upload system with categorization

### Testing & Quality
- Integration tests use Vitest with React Testing Library
- E2E tests use Playwright
- Always run full test suite: `pnpm test`
- Test page builder functionality in admin interface after changes

### Performance Notes
- Page builder renders server-side through Next.js
- Images are automatically optimized through Sharp
- Content blocks can be cached and reused across pages
- Use `pnpm devsafe` if experiencing Next.js cache issues

## Common Workflows

### Creating New Page Builder Blocks
1. Add block type to `ContentBlocks.ts` collection
2. Create React component in page builder system
3. Register in block renderer
4. Test in admin interface
5. Update documentation

### Adding New Collections
1. Create collection file in `/src/collections/`
2. Import in `payload.config.ts`
3. Run `pnpm generate:types`
4. Test admin interface
5. Add to relationship fields as needed

### Template System Updates
1. Modify `PageTemplates.ts` for new template types
2. Update template loading hooks if needed
3. Test template application in Pages collection
4. Update template gallery UI if required

### Environment & Configuration
- Environment variables in `.env` (copy from `.env.example`)
- Database URI: `DATABASE_URI=file:./my-website.db`
- Required: `PAYLOAD_SECRET` for security
- Optional: Cloud storage and MongoDB for production deployment

## Architecture Decisions

### Why This Structure
- **Separation of concerns**: Content creation vs. presentation logic
- **Reusability**: Content blocks used across multiple pages
- **Flexibility**: Three different ways to build pages based on needs
- **User experience**: Non-technical users can build complex pages
- **Developer experience**: Extensible system with TypeScript safety

### Key Benefits
- **No-code page building**: Complex pages built entirely through admin interface
- **Performance**: Server-side rendering with optimized content delivery
- **Scalability**: Template and content block system reduces duplication
- **Maintainability**: Clear separation between content and code
- **Type safety**: Full TypeScript coverage with auto-generated types

This architecture enables building sophisticated websites entirely through the admin interface while maintaining developer flexibility for custom functionality.

<citations>
<document>
<document_type>WARP_DOCUMENTATION</document_type>
<document_id>getting-started/quickstart-guide/coding-in-warp</document_id>
</document>
</citations>