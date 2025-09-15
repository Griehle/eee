# Page Template System Guide

## 🎯 Overview

The page template system allows you to create reusable page layouts and apply them to new pages, similar to WPBakery's template library. This saves time and ensures consistency across your website.

## 📋 How Templates Work

Templates are pre-built page structures that contain:
- **Page Builder Blocks**: Configured content blocks
- **Rich Text Content**: Formatted text sections  
- **Custom HTML**: Advanced layouts
- **Styling & Design**: Applied design options

## 🏗️ Creating Templates

### Step 1: Create a Page Template
1. Go to **Admin Panel → Page Builder → Page Templates**
2. Click **"Add New"**
3. Fill in template details:
   - **Name**: Descriptive name (e.g., "Homepage Hero")
   - **Description**: Brief explanation of template purpose
   - **Category**: Choose appropriate category
   - **Tags**: Add searchable tags
   - **Thumbnail**: Upload preview image (optional)

### Step 2: Build Template Content
1. Use the **Template Structure** field to build your layout
2. Add blocks same way you would for a regular page:
   - **Content Block**: Reference existing content blocks
   - **Rich Text**: Add formatted text directly
   - **Custom HTML**: Insert custom code

### Step 3: Configure Template Settings
- **Featured Template**: Check to highlight in gallery
- **Active Status**: Enable/disable template availability
- **Metadata**: Add version, compatibility info

## 📄 Using Templates on Pages

### Method 1: Template Options (Sidebar)
1. Edit any page in **Pages** collection
2. Find **"Template Options"** in sidebar
3. Check **"Load content from a template"**
4. Select desired template from dropdown
5. Click **"Load Template Content"** button
6. Template content replaces current page builder content

### Method 2: Template Gallery
1. Edit any page in **Pages** collection
2. Scroll to **Template Gallery** section
3. Browse available templates by category
4. Use search to find specific templates
5. Click **"Load Template"** on desired template
6. Template content loads into page builder

### Method 3: Automatic Loading (New Pages)
1. Create new page
2. Use **Template Options** in sidebar
3. Select template before adding content
4. Template loads automatically when saving

## 🎨 Template Categories

### Available Categories:
- 🏠 **Homepage**: Landing page layouts
- 📄 **About**: Company/personal about pages  
- 📞 **Contact**: Contact forms and info pages
- 🛍️ **Services**: Service showcase pages
- 👥 **Team**: Team member displays
- 📰 **Blog**: Blog post layouts
- 📁 **Portfolio**: Work showcase pages
- 💰 **Pricing**: Pricing table layouts
- ❓ **FAQ**: Frequently asked questions
- 🎯 **Landing Page**: Marketing landing pages
- 🔧 **Other**: Miscellaneous templates

## 🔧 Managing Templates

### Organizing Templates
- **Use Categories**: Properly categorize all templates
- **Add Tags**: Include searchable keywords
- **Write Descriptions**: Clear, helpful descriptions
- **Add Thumbnails**: Visual previews help selection

### Template Maintenance
- **Regular Updates**: Keep templates current
- **Test Functionality**: Ensure all blocks work
- **Version Control**: Update version numbers
- **Archive Old**: Deactivate outdated templates

## 💡 Best Practices

### Template Creation
1. **Start Simple**: Begin with basic layouts
2. **Use Existing Blocks**: Reference well-tested content blocks
3. **Test Thoroughly**: Verify all elements work correctly
4. **Document Purpose**: Clear names and descriptions

### Template Usage
1. **Preview First**: Review template before applying
2. **Customize After**: Templates are starting points
3. **Maintain Consistency**: Use similar templates for similar pages
4. **Regular Cleanup**: Remove unused template content

### Content Strategy
1. **Reusable Blocks**: Create content blocks for repeated elements
2. **Flexible Layouts**: Design templates for various content lengths
3. **Mobile Friendly**: Ensure templates work on all devices
4. **SEO Ready**: Include proper heading structures

## 🚀 Advanced Features

### Template Metadata
- **Version Tracking**: Keep track of template versions
- **Compatibility**: Note device/browser requirements
- **Required Plugins**: Document any dependencies
- **Author Info**: Credit template creators

### Custom Development
Templates can include:
- **Custom CSS**: Advanced styling
- **JavaScript**: Interactive functionality
- **Third-party Integrations**: External services
- **Dynamic Content**: Database-driven elements

## 🔍 Template Examples

### Homepage Template
```json
{
  "name": "Modern Homepage",
  "category": "homepage",
  "blocks": [
    "Hero Section",
    "Features Grid", 
    "Testimonials",
    "Call to Action"
  ]
}
```

### Contact Template
```json
{
  "name": "Contact Page",
  "category": "contact",
  "blocks": [
    "Page Header",
    "Contact Form",
    "Office Map",
    "Contact Info"
  ]
}
```

## ❓ Troubleshooting

### Common Issues

**Template Not Loading**
- Check template is active
- Verify API endpoints working
- Ensure proper permissions

**Missing Content**
- Confirm referenced content blocks exist
- Check block relationships are valid
- Verify rich text content formatted correctly

**Styling Problems**
- Review custom CSS syntax
- Check responsive design settings
- Test on multiple devices

**Performance Issues**
- Optimize image sizes in templates
- Minimize custom JavaScript
- Remove unused template content

### Getting Help
1. Check template usage instructions in admin
2. Review this documentation
3. Test with simple templates first
4. Contact system administrator if issues persist

## 📊 Template Analytics

Track template usage to optimize your library:
- **Popular Templates**: Most frequently used
- **Category Performance**: Which categories are favored
- **User Feedback**: Collect template ratings
- **Update Frequency**: How often templates are modified

## 🔄 Migration & Backup

### Exporting Templates
- Use payload admin export functionality
- Save template JSON for backup
- Document custom code separately

### Importing Templates  
- Import via admin interface
- Verify all dependencies exist
- Test imported templates thoroughly

---

This template system provides the flexibility of WPBakery with the modern architecture of Payload CMS. Use it to create consistent, professional pages quickly and efficiently!