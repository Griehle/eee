# My Website - Page Builder Documentation

## 🎯 Overview

This website uses a powerful, WPBakery-style page builder system built with Payload CMS and Next.js. You can create complex, feature-rich pages entirely through the admin interface without writing any code.

## 🚀 Getting Started

### Accessing the Admin Panel

- **Admin URL**: `http://localhost:3000/admin`
- **Create Pages**: `http://localhost:3000/admin/collections/pages/create`
- **Content Blocks**: `http://localhost:3000/admin/collections/content-blocks`
- **Page Templates**: `http://localhost:3000/admin/collections/page-templates`

### Starting the Development Server

```bash
pnpm run dev
```

The server will start on `http://localhost:3000`

## 🏗️ Page Builder System

### Three Ways to Build Pages

1. **Direct Page Building** - Use the Page Builder field directly in pages
2. **Content Blocks** - Create reusable components and reference them
3. **Page Templates** - Use pre-made layouts for common page types

## 📋 Available Block Types (30+)

### Layout Elements
- 📐 **Row** - 12-column responsive grid container
- 📏 **Column** - Individual columns within rows (1/12 to 12/12)
- 📄 **Section** - Full-width section containers

### Content Elements
- 📝 **Text Block** - Rich text with full formatting
- 📰 **Heading** - Configurable headings (H1-H6) with styling
- 🖼️ **Image** - Single images with responsive sizing
- 🖼️ **Image Gallery** - Multiple images in grid layouts
- 📹 **Video** - YouTube, Vimeo, or direct video embeds
- 💬 **Quote/Testimonial** - Styled quotes with author info
- 🔘 **Button** - Customizable buttons (4 styles, 3 sizes)
- 🔗 **Icon Box** - Icon + text combinations

### Interactive Elements
- 📋 **Accordion** - Collapsible content sections (perfect for FAQs)
- 🗂️ **Tabs** - Tabbed content interface
- 🎠 **Carousel/Slider** - Image and content sliders
- 📞 **Contact Form** - Configurable forms with validation
- 🗺️ **Google Maps** - Embedded maps with custom settings

### Data Display
- ✅ **Features List** - Feature listings with icons and descriptions
- 📊 **Statistics** - Animated number displays with labels
- 👥 **Team Members** - Team member grids (2-4 columns)
- 📝 **Posts Grid** - Blog post listings with filtering

### Visual & Media
- 🌟 **Call to Action** - Prominent CTA sections with dual buttons
- 📊 **Progress Bar** - Animated progress indicators
- ➗ **Separator** - Visual dividers between sections (5 styles)

### Advanced
- 🎨 **Custom HTML** - Insert custom HTML/CSS for specialized content

## 🎨 Styling System

Every block includes comprehensive styling options:

### Spacing Controls
- Margin (top, bottom)
- Padding (all sides)

### Background Options
- Solid colors
- Background images with positioning
- CSS gradients
- Overlay effects

### Border Controls
- Width, style, color
- Border radius for rounded corners

### Typography
- Text alignment
- Font colors and sizes
- Font weights

### Effects & Animations
- Box shadows
- Entrance animations (fade, slide, zoom, bounce)
- Animation timing controls (delay, duration)

### Responsive Options
- Device-specific visibility controls
- Responsive breakpoint settings

### Advanced Customization
- Custom CSS classes
- Custom CSS code injection

## 🚀 Quick Start: Building Your First Page

### Step 1: Create a Homepage

1. Go to `http://localhost:3000/admin/collections/pages/create`
2. Fill in basic information:
   - **Title**: "Homepage"
   - **Slug**: "home"

3. **Build with Page Builder**:
   - Add **Rich Text** block for hero content
   - Add **Image Gallery** for portfolio showcase
   - Add **Features List** for key benefits
   - Add **Contact Form** for lead generation

4. **Configure styling** for each block:
   - Set margins and padding
   - Add background colors/images
   - Configure animations

5. Save and preview your page!

## 🏗️ Advanced: Building Complex Pages

### Method 1: Using Content Blocks (Recommended for Reusable Elements)

#### Create Reusable Content Blocks

Go to: `http://localhost:3000/admin/collections/content-blocks`

**Hero Section Block:**
```
Title: "Homepage Hero"
Block Type: Call to Action
Configuration:
- Title: "Welcome to Our Amazing Service"
- Description: "Transform your business with cutting-edge solutions"
- Primary Button: "Get Started" → "/contact"
- Secondary Button: "Learn More" → "/about"
- Background Image: Upload hero image
- Styling: Configure colors, spacing, animations
```

**Features Grid Block:**
```
Title: "Key Features"
Block Type: Features List
Features:
- 🚀 "Fast Performance" - "Lightning-fast loading times"
- 🔒 "Secure" - "Enterprise-grade security"
- 📱 "Responsive" - "Works perfectly on all devices"
- 🎨 "Customizable" - "Fully customizable to your needs"
```

**Statistics Block:**
```
Title: "Company Stats"
Block Type: Statistics
Stats:
- "1000+" - "Happy Customers"
- "99.9%" - "Uptime Guarantee"
- "24/7" - "Support Available"
- "5 Years" - "Industry Experience"
```

#### Use Content Blocks in Pages

1. Create or edit a page
2. In **Page Builder**, add **Content Block** blocks
3. Select your pre-made content blocks
4. Customize as needed

### Method 2: Using Page Templates

#### Create Templates

Go to: `http://localhost:3000/admin/collections/page-templates`

**Homepage Template:**
```
Name: "Modern Homepage"
Category: Homepage
Template Structure:
1. Content Block → "Homepage Hero"
2. Content Block → "Key Features" 
3. Content Block → "Company Stats"
4. Content Block → "Contact Form"
```

#### Apply Templates to Pages

1. Create or edit a page
2. In sidebar, find **Template Options**
3. Check "Load content from a template"
4. Select template and click "Load Template Content"
5. Customize the loaded content as needed

## 📖 Real-World Examples

### Landing Page Layout
```
1. Hero Section (CTA block)
   - Compelling headline
   - Product demo video
   - "Sign up" button

2. Problem/Solution (Text + Image)
   - Problem description
   - Solution explanation

3. Features Grid (Features list)
   - Key benefits with icons

4. Social Proof (Statistics + Testimonials)
   - Usage stats
   - Customer testimonials

5. Pricing (Custom HTML)
   - Pricing comparison table

6. FAQ (Accordion)
   - Common questions

7. Final CTA (CTA block)
   - Contact form
```

### Portfolio/Agency Website
```
1. Hero (CTA block)
   - Agency introduction
   - "View Work" button

2. Services (Features list)
   - Design, Development, Marketing

3. Portfolio (Image gallery)
   - Project showcases
   - Case studies

4. Testimonials (Testimonials carousel)
   - Client feedback

5. Team (Team grid)
   - Team members and roles

6. Process (Tabs or Accordion)
   - Methodology steps

7. Contact (Contact form + Map)
   - Inquiry form
   - Office locations
```

### E-commerce Product Page
```
1. Product Hero (Image gallery + Text)
   - Product photos and description
   - Price and buy button

2. Features/Specs (Tabs)
   - Product features
   - Technical specifications

3. Reviews (Testimonials)
   - Customer reviews

4. Related Products (Posts grid)
   - Product recommendations

5. FAQ (Accordion)
   - Shipping and returns
```

## 🎯 Page Types You Can Build

With this system, you can create:

### Business Websites
- ✅ Corporate homepages
- ✅ About us pages
- ✅ Services showcases
- ✅ Contact pages with forms and maps
- ✅ Team member pages

### Marketing Pages
- ✅ Landing pages for campaigns
- ✅ Product launch pages
- ✅ Feature comparison pages
- ✅ Pricing pages
- ✅ Testimonial pages

### Portfolio/Creative
- ✅ Portfolio showcases
- ✅ Case study pages
- ✅ Gallery pages
- ✅ Artist/designer portfolios
- ✅ Photography sites

### E-commerce Style
- ✅ Product showcase pages
- ✅ Category landing pages
- ✅ Feature comparison pages
- ✅ Customer review pages

### Content/Blog
- ✅ Blog homepages
- ✅ Article landing pages
- ✅ Author pages
- ✅ Category pages

## 🔧 Advanced Techniques

### Complex Layouts with Rows and Columns

**Two-Column Layout:**
```
Row Block:
├── Column (8/12): Main content
│   ├── Heading
│   ├── Text Block
│   └── Image Gallery
└── Column (4/12): Sidebar
    ├── Statistics
    ├── Contact Form
    └── CTA Button
```

**Three-Column Services:**
```
Row Block:
├── Column (4/12): Service 1
│   ├── Icon Box
│   ├── Text Block
│   └── Button
├── Column (4/12): Service 2
│   ├── Icon Box
│   ├── Text Block
│   └── Button
└── Column (4/12): Service 3
    ├── Icon Box
    ├── Text Block
    └── Button
```

### Animation and Effects

**Entrance Animations:**
- fadeIn, fadeInUp, fadeInDown
- fadeInLeft, fadeInRight
- slideInUp, slideInDown
- zoomIn, bounceIn

**Timing Controls:**
- Animation delay (0-5 seconds)
- Animation duration (0.5-3 seconds)

### Responsive Design

**Responsive Visibility:**
- Hide on mobile/tablet/desktop
- Different content for different devices

**Responsive Layout:**
- Columns stack on mobile
- Different spacing on tablets
- Optimized for all screen sizes

## 🎨 Design Best Practices

### Visual Hierarchy
1. Use proper heading structure (H1 → H2 → H3)
2. Consistent spacing between sections
3. Clear visual separation with separators
4. Strategic use of colors and contrasts

### Content Organization
1. Start with hero section
2. Follow with key benefits/features
3. Include social proof (testimonials/stats)
4. End with clear call-to-action

### Performance Optimization
1. Optimize images before uploading
2. Use appropriate video formats
3. Minimize custom CSS
4. Test loading speed

### SEO Optimization
1. Proper heading hierarchy
2. Alt text for all images
3. Descriptive page titles and slugs
4. Structured content flow

## 📁 File Structure

```
my-website/
├── src/
│   ├── collections/
│   │   ├── Pages.ts              # Page collection with page builder
│   │   ├── ContentBlocks.ts      # Content blocks collection
│   │   ├── PageTemplates.ts      # Page templates collection
│   │   └── ...
│   ├── components/
│   │   └── admin/
│   │       ├── LoadTemplateButton.tsx
│   │       ├── TemplateGallery.tsx
│   │       └── TemplateUsageInstructions.tsx
│   └── payload.config.ts         # Main Payload configuration
├── docs.md                       # This documentation
├── BUILDING-PAGES-GUIDE.md      # Detailed page building guide
├── README-PageBuilder.md         # Technical page builder overview
└── TEMPLATE-GUIDE.md            # Template system guide
```

## 🚨 Common Workflows

### Creating a New Website Section

1. **Plan the layout** - Sketch sections and content
2. **Create content blocks** - Build reusable components
3. **Build the page** - Combine blocks in page builder
4. **Style and test** - Configure styling and test responsiveness
5. **Create template** - Save successful layouts as templates

### Updating Existing Content

1. **Edit content blocks** - Update reusable components
2. **Changes reflect everywhere** - All pages using the block update
3. **Or edit pages directly** - For page-specific changes

### Managing Design Consistency

1. **Create a design system** - Consistent colors, fonts, spacing
2. **Use content blocks** - Reusable styled components
3. **Create templates** - Consistent page layouts
4. **Document patterns** - Keep track of what works

## 🔍 Troubleshooting

### Page Not Loading Correctly
- Check that all referenced content blocks exist
- Verify image uploads completed successfully
- Test with browser developer tools

### Styling Issues
- Review responsive settings for different devices
- Check custom CSS syntax
- Verify color values are valid

### Template Problems
- Ensure template is marked as "Active"
- Check that referenced content blocks exist
- Verify template structure is complete

## 🚀 Development Commands

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Generate TypeScript types
pnpm run generate:types

# Generate import map
pnpm run generate:importmap
```

## 📝 Environment Configuration

### Required Environment Variables
```env
DATABASE_URI=file:./my-website.db
PAYLOAD_SECRET=your-secret-key-here
```

### Development Setup
1. Install dependencies: `pnpm install`
2. Set up environment variables
3. Start development server: `pnpm run dev`
4. Access admin at `http://localhost:3000/admin`

## 🎯 Next Steps

1. **Explore the admin interface** at `http://localhost:3000/admin`
2. **Create your first content blocks** for reusable components
3. **Build a homepage** using the page builder
4. **Create templates** for common page types
5. **Experiment with styling options** and animations

## 📚 Additional Resources

- `BUILDING-PAGES-GUIDE.md` - Detailed step-by-step building instructions
- `TEMPLATE-GUIDE.md` - Complete template system documentation
- `README-PageBuilder.md` - Technical overview and features list

## 🎉 You're Ready!

Your page builder system is fully configured and ready to create professional, feature-rich websites entirely through the admin interface. No additional coding required!