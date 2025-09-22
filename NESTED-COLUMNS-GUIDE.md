# Nested Content Blocks in Columns Guide

## 🎯 Overview

You can now add any type of content block directly into columns within rows! This provides much more flexibility than the previous rich text-only columns.

## ✨ New Features

### Enhanced Column Structure

Each column in a row can now contain:
- **Content Blocks** - Reference any existing content block
- **Rich Text** - Formatted text content
- **Custom HTML** - Custom HTML with optional CSS

### Backward Compatibility

- Existing rows with rich text content will continue to work
- The legacy rich text field is still available as a fallback
- No migration needed for existing content

## 🏗️ How to Use

### Step 1: Create Individual Content Blocks

First, create the content blocks you want to use in your columns:

1. Go to `http://localhost:3000/admin/collections/content-blocks`
2. Create content blocks for each type of content:
   - **Image Block**: For product images or photos
   - **Button Block**: For call-to-action buttons
   - **Heading Block**: For section headers
   - **Text Block**: For descriptions
   - **Icon Box Block**: For features or services

**Example Content Blocks:**
```
Block 1: "Product Image" (Image block)
Block 2: "Product Title" (Heading block) 
Block 3: "Product Description" (Text block)
Block 4: "Buy Now Button" (Button block)
```

### Step 2: Create a Row Block

1. Create a new content block with type "Row"
2. Add columns with desired widths:
   - Column 1: `6/12` (half width)
   - Column 2: `6/12` (half width)
3. For each column, use **Column Content** section:
   - Add "Content Block" and select your pre-created blocks
   - Add "Rich Text" for direct text content
   - Add "Custom HTML" for specialized content

### Step 3: Use the Row in Pages

1. Go to your page editor
2. Add a "Content Block" in the page builder
3. Select your row block
4. Preview your page!

## 🎨 Layout Examples

### Two-Column Product Layout
```
Row (2 columns):
├── Column 1 (6/12): Product image block
└── Column 2 (6/12): 
    ├── Product title (heading block)
    ├── Product description (text block)
    └── Buy now button (button block)
```

### Three-Column Feature Section
```
Row (3 columns):
├── Column 1 (4/12):
│   ├── Feature icon (icon box block)
│   └── Feature description (rich text)
├── Column 2 (4/12):
│   ├── Feature icon (icon box block) 
│   └── Feature description (rich text)
└── Column 3 (4/12):
    ├── Feature icon (icon box block)
    └── Feature description (rich text)
```

### Mixed Content Layout
```
Row (2 columns):
├── Column 1 (8/12):
│   ├── Article heading (heading block)
│   ├── Article content (text block)
│   └── Article gallery (gallery block)
└── Column 2 (4/12):
    ├── Author bio (text block)
    ├── Related articles (rich text)
    └── Newsletter signup (custom HTML)
```

## 🔧 Advanced Tips

### Content Block Management
- Create reusable content blocks for elements you'll use across multiple pages
- Use descriptive names like "Homepage Hero", "Product CTA", "Footer Contact"
- Organize blocks by type or page section for easy management

### Column Width Strategies
- Use `12/12` for full-width content
- Use `6/12 + 6/12` for equal two-column layouts
- Use `8/12 + 4/12` for main content + sidebar layouts
- Use `4/12 + 4/12 + 4/12` for three equal columns
- Mix different widths: `3/12 + 6/12 + 3/12` for centered content

### Performance Considerations
- Reusing content blocks is more efficient than duplicating content
- Content blocks are cached and can be shared across multiple pages
- Use content blocks for repeated elements like CTAs, contact forms, or product cards

### Nested Structure Best Practices
- Keep nesting levels reasonable (avoid too many nested blocks)
- Use consistent spacing and styling across columns
- Test responsive behavior on mobile devices
- Consider the reading flow when arranging column content

## 🚀 Real-World Examples

### Landing Page Section
```
Row: Hero Section (1 column)
├── Column (12/12): Hero content block with background image

Row: Features (3 columns)  
├── Column (4/12): Feature 1 icon box
├── Column (4/12): Feature 2 icon box
└── Column (4/12): Feature 3 icon box

Row: Testimonial + CTA (2 columns)
├── Column (8/12): Customer testimonial block
└── Column (4/12): Sign-up CTA button
```

### E-commerce Product Page
```
Row: Product Details (2 columns)
├── Column (6/12): Product gallery block
└── Column (6/12):
    ├── Product title (heading)
    ├── Price display (text block)
    ├── Product description (rich text)
    ├── Add to cart button
    └── Shipping info (text block)

Row: Related Products (1 column)
└── Column (12/12): Related products grid block
```

This new functionality gives you the power to create complex, professional layouts without any coding!