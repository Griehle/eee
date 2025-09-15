# WPBakery-Style Page Builder for Payload CMS

This page builder system provides a comprehensive, drag-and-drop interface similar to WPBakery Page Builder for WordPress, built specifically for Payload CMS and Next.js.

## Features

### 🎨 Visual Page Building
- **Drag & Drop Interface**: Intuitive block-based editor
- **Live Preview**: Real-time preview of changes
- **Responsive Design**: Mobile-first approach with responsive controls

### 🧩 Comprehensive Block Library
- **Layout Blocks**: Rows, columns, sections for structure
- **Content Blocks**: Text, headings, images, videos, galleries
- **Interactive Elements**: Accordions, tabs, carousels, contact forms
- **Data Display**: Statistics, pricing tables, team grids, post grids
- **Visual Elements**: Buttons, icon boxes, separators, progress bars
- **Advanced**: Video backgrounds, call-to-action sections, counters

### 🎯 Advanced Styling Options
- **Spacing Controls**: Margins and padding for all sides
- **Background Options**: Colors, gradients, images with positioning
- **Border Controls**: Width, style, color, radius
- **Typography**: Text alignment, colors, sizes, weights
- **Animations**: Fade, slide, zoom, bounce effects with timing controls
- **Responsive Visibility**: Hide/show on different device sizes
- **Custom CSS**: Advanced customization support

## Getting Started

### 1. Import the Page Builder
```typescript
import { PageBuilder } from '@/components/PageBuilder'

// In your page component
<PageBuilder blocks={page.pageBuilder} />
```

### 2. Create Content Blocks
Navigate to the admin panel and go to **Page Builder > Content Blocks** to create reusable content blocks.

### 3. Build Pages
Edit any page and use the **Page Builder** field to construct your layout using:
- **Content Blocks**: Reference existing blocks from your library
- **Rich Text**: Add formatted text content directly
- **Custom HTML**: Insert custom HTML/CSS for advanced layouts

### 4. Use Templates
Create reusable templates in **Page Builder > Page Templates** and apply them to new pages.

## Block Types

### Layout Elements
- **Row**: Container with responsive column system (12-column grid)
- **Column**: Individual column within a row
- **Section**: Full-width section container

### Content Elements
- **Text Block**: Rich text content with formatting
- **Heading**: Configurable headings (H1-H6) with custom styling
- **Image**: Single images with responsive sizing
- **Image Gallery**: Multiple images in a grid layout
- **Video**: Embedded videos (YouTube, Vimeo, direct links)
- **Quote/Testimonial**: Styled quotes with author information
- **Button**: Customizable buttons with multiple styles and sizes
- **Icon Box**: Icon + text combinations

### Interactive Elements
- **Accordion**: Collapsible content sections
- **Tabs**: Tabbed content interface
- **Carousel/Slider**: Image and content sliders
- **Contact Form**: Configurable contact forms
- **Google Maps**: Embedded maps with custom settings

### Data Display
- **Features List**: Feature listings with icons and descriptions
- **Statistics**: Number displays with labels and icons
- **Pricing Table**: Pricing plans with feature comparisons
- **Team Members**: Team member grids
- **Posts Grid**: Blog post listings with filtering

### Visual & Media
- **Video Background**: Full-screen video backgrounds
- **Call to Action**: Prominent CTA sections
- **Progress Bar**: Animated progress indicators
- **Counter**: Animated number counters
- **Separator**: Visual dividers between sections

## Styling System

### Design Options Panel
Each block includes comprehensive styling options:

#### Spacing
- Margin (top, bottom)
- Padding (all sides)

#### Background
- Solid colors
- Background images with positioning
- CSS gradients
- Overlay effects

#### Borders
- Width, style, color
- Border radius for rounded corners

#### Typography
- Text alignment
- Font colors and sizes
- Font weights

#### Effects
- Box shadows
- Entrance animations
- Animation timing controls

#### Responsive Options
- Device-specific visibility controls
- Responsive breakpoint settings

#### Advanced
- Custom CSS classes
- Custom CSS code injection

### Animation System
Built-in animations include:
- **Fade Effects**: fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- **Slide Effects**: slideInUp, slideInDown
- **Scale Effects**: zoomIn, bounceIn
- **Custom Timing**: Delay and duration controls

## Template System

### Creating Templates
1. Go to **Page Builder > Page Templates**
2. Create a new template with predefined blocks
3. Categorize templates (Homepage, About, Contact, etc.)
4. Add tags for easy discovery

### Using Templates
1. Edit any page
2. Choose from available templates in the page builder
3. Customize the template content as needed

### Template Categories
- 🏠 Homepage
- 📄 About
- 📞 Contact
- 🛍️ Services
- 👥 Team
- 📰 Blog
- 📁 Portfolio
- 💰 Pricing
- ❓ FAQ
- 🎯 Landing Page
- 🔧 Other

## Best Practices

### Performance
- Optimize images before uploading
- Use appropriate video formats and sizes
- Minimize custom CSS for better caching

### Content Strategy
- Create reusable content blocks for consistent branding
- Use templates for similar page types
- Maintain a consistent design system

### Responsive Design
- Test layouts on multiple device sizes
- Use responsive visibility controls sparingly
- Ensure content is readable on all devices

### SEO Optimization
- Use proper heading hierarchy (H1 > H2 > H3)
- Add alt text to all images
- Structure content logically

## Extending the System

### Adding New Block Types
1. Create a new block component in `src/components/PageBuilder/blocks/`
2. Add the block type to the ContentBlocks collection options
3. Add field configurations for the new block type
4. Register the block in the BlockRenderer component

### Custom Styling
- Add custom CSS classes in your theme
- Use the customCSS field for block-specific styles
- Create CSS custom properties for consistent theming

## Migration from WPBakery

This system provides similar functionality to WPBakery Page Builder:

### Equivalent Features
- **Row/Column System**: ✅ Full 12-column grid system
- **Content Blocks**: ✅ All major content types supported
- **Styling Options**: ✅ Comprehensive design controls
- **Templates**: ✅ Reusable page templates
- **Animations**: ✅ Entrance animations with timing
- **Responsive Controls**: ✅ Device visibility options
- **Custom CSS**: ✅ Advanced customization support

### Additional Benefits
- **Modern Tech Stack**: Built on Next.js and React
- **Type Safety**: Full TypeScript support
- **Performance**: Server-side rendering and optimization
- **Flexibility**: Easy to extend and customize
- **Integration**: Native Payload CMS integration

## Troubleshooting

### Common Issues
1. **Blocks not rendering**: Check that all block components are imported correctly
2. **Styling not applying**: Ensure CSS file is imported in your app
3. **Animations not working**: Verify animation CSS classes are included
4. **Images not displaying**: Check media upload configuration

### Support
- Check the component documentation
- Review the CSS classes and animations
- Ensure all required collections are configured
- Verify payload.config.ts includes all collections

## Future Enhancements

Planned features:
- Visual drag-and-drop editor in the admin panel
- More animation options
- Advanced grid systems
- Component previews in admin
- Import/export functionality for templates
- A/B testing capabilities