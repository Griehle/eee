# PDF FlipBook Block Guide

## 🎯 Overview

You can now embed beautiful PDF flip books directly into your pages using the page builder! This integrates your existing PDF Documents collection with the page builder system.

## ✨ Features

- **Easy Integration**: Select any PDF from your PDF Documents collection
- **Two Modes**: Basic flipbook or Advanced flipbook with search, zoom, and fullscreen
- **Flexible Display**: Show/hide document title and description
- **Override Settings**: Customize dimensions and features per instance
- **Responsive Design**: Automatically adapts to all device sizes
- **Rich Metadata**: Display document information, tags, and publication date

## 🏗️ How to Use

### Step 1: Upload PDF Documents

First, make sure you have PDF documents in your collection:

1. Go to `http://localhost:3000/admin/collections/pdf-documents`
2. Create new PDF documents or use existing ones
3. Configure settings like:
   - Title and description
   - Category and tags
   - Thumbnail image
   - FlipBook settings (width, height, download options)
   - Publish status

### Step 2: Create a PDF FlipBook Content Block

1. Go to `http://localhost:3000/admin/collections/content-blocks`
2. Click "Create New"
3. Set **Block Type** to "📚 PDF FlipBook"
4. Configure the settings:

#### Basic Configuration
- **PDF Document**: Select a PDF from your documents collection
- **Display Title**: Show document title above flipbook
- **Display Description**: Show document info below flipbook
- **Use Advanced**: Enable advanced features (search, zoom, fullscreen)

#### Override Document Settings (Optional)
- **Width**: Override document width
- **Height**: Override document height  
- **Enable Download**: Override download setting
- **Enable Fullscreen**: Override fullscreen setting
- **Show Cover**: Override cover page setting

### Step 3: Add to Pages

1. Edit any page
2. In the **Page Builder** section, add a "Content Block"
3. Select your PDF FlipBook content block
4. Save and preview your page!

## 🎨 Configuration Examples

### Basic Document Display
```
Block Type: PDF FlipBook
PDF Document: "Company Brochure"
Display Title: ✅ Checked
Display Description: ❌ Unchecked
Use Advanced: ✅ Checked
Override Settings: (Leave empty to use document defaults)
```

### Customized Flipbook
```
Block Type: PDF FlipBook
PDF Document: "Product Catalog"
Display Title: ✅ Checked
Display Description: ✅ Checked
Use Advanced: ✅ Checked
Override Settings:
  - Width: 800
  - Height: 1000
  - Enable Download: ✅ Checked
  - Enable Fullscreen: ✅ Checked
```

### Simple Basic Flipbook
```
Block Type: PDF FlipBook
PDF Document: "Quick Reference"
Display Title: ❌ Unchecked
Display Description: ❌ Unchecked
Use Advanced: ❌ Unchecked
Override Settings: (Leave empty)
```

## 🔧 Advanced Features

### Advanced Flipbook Mode (Default)
When "Use Advanced" is enabled, users get:
- **Search**: Full-text search within the PDF
- **Zoom**: Zoom in/out with controls
- **Fullscreen**: Full-screen viewing mode
- **Enhanced Toolbar**: Rich control interface
- **Keyboard Shortcuts**: Arrow keys, F for fullscreen, +/- for zoom
- **Thumbnail Navigation**: Visual page thumbnails

### Basic Flipbook Mode
When "Use Advanced" is disabled, users get:
- **Page Flipping**: Smooth page-turn animations
- **Navigation**: Previous/Next buttons
- **Thumbnails**: Page thumbnail navigation
- **Cover Page**: Optional custom cover page
- **Mobile Support**: Touch-friendly navigation

### Settings Hierarchy
Settings are applied in this order of priority:
1. **Override Settings** (highest priority)
2. **Document Settings** (from PDF Documents collection)  
3. **Default Values** (fallback)

This means you can set global defaults in the PDF document, but override specific instances as needed.

## 📱 Responsive Design

The flipbook automatically adapts to different screen sizes:
- **Desktop**: Full-featured experience with all controls
- **Tablet**: Optimized touch interface
- **Mobile**: Simplified controls, swipe navigation

## 🎯 Layout Examples

### Product Showcase Page
```
Row (2 columns):
├── Column 1 (8/12): PDF FlipBook (Product Catalog)
└── Column 2 (4/12): 
    ├── Product description (text block)
    ├── Key features (features list)
    └── Contact CTA (button block)
```

### Documentation Center
```
Row (Full width):
├── Heading: "User Manuals"
├── PDF FlipBook: "Complete User Guide" (Advanced mode)
├── Separator
├── Row (3 columns):
│   ├── PDF FlipBook: "Quick Start" (Basic mode)
│   ├── PDF FlipBook: "FAQ" (Basic mode)
│   └── PDF FlipBook: "Troubleshooting" (Basic mode)
```

### Educational Content
```
Row (Full width):
├── PDF FlipBook: "Course Materials" 
│   - Display Title: ✅
│   - Display Description: ✅
│   - Shows: title, author, tags, publication date
│   - Advanced mode with search functionality
```

## ⚙️ Technical Details

### Document Information Display
When "Display Description" is enabled, the flipbook shows:
- Document description
- Category (if set)
- Tags (if any)
- Publication date (if set)
- Author (if set)

### Error Handling
The component gracefully handles:
- Missing PDF document selection
- Broken PDF file links
- Loading states
- Network errors

### Performance
- **Dynamic Loading**: FlipBook components load only when needed
- **SSR Safe**: Uses dynamic imports to prevent server-side issues
- **Optimized Rendering**: PDF.js handles efficient page rendering
- **Caching**: PDF documents are cached for faster subsequent loads

## 🔍 Troubleshooting

### FlipBook Not Displaying
1. **Check PDF Selection**: Ensure a PDF document is selected
2. **Verify File Upload**: Check that the PDF file was uploaded correctly
3. **Publication Status**: Ensure the PDF document is published
4. **Browser Support**: Modern browsers required for PDF.js

### Performance Issues
1. **PDF Size**: Large PDFs may load slowly
2. **Network**: Check internet connection
3. **Browser Memory**: Very large PDFs may use significant memory

### Mobile Display Issues
1. **Touch Navigation**: Ensure touch gestures work
2. **Screen Size**: Test on actual devices
3. **Loading Time**: Mobile networks may be slower

## 🚀 Best Practices

### Content Organization
- Use descriptive titles for PDF documents
- Add relevant tags and categories
- Set appropriate thumbnails
- Write clear descriptions

### Performance Optimization  
- Optimize PDFs before uploading (compress images, reduce file size)
- Use appropriate dimensions (don't make flipbooks too large)
- Consider using Basic mode for simple documents

### User Experience
- Provide context around flipbooks (titles, descriptions)
- Use Advanced mode for documents that benefit from search
- Test on multiple devices and screen sizes
- Consider loading times for large documents

### SEO Considerations
- Use descriptive document titles
- Add relevant tags and categories
- Include document descriptions
- Ensure PDFs contain searchable text

This integration brings professional flip book functionality directly into your page builder, making it easy to create engaging document presentations throughout your website!