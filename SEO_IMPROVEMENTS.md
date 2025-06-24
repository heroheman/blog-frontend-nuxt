# SEO Improvements for flore.nz

This document outlines the comprehensive SEO improvements implemented across the flore.nz website.

## Key Improvements Made

### 1. Enhanced Meta Tags with `useSeoMeta`
- **Blog Index Page** (`/pages/blog/index.vue`):
  - Dynamic titles based on tag filtering
  - Contextual descriptions for tag-filtered views
  - Complete Open Graph and Twitter Card metadata
  - Structured data for blog listings

- **Individual Blog Posts** (`/pages/blog/[slug].vue`):
  - Dynamic titles from article content
  - Rich meta descriptions combining article description and content excerpt
  - Article-specific Open Graph metadata with proper image handling
  - Comprehensive structured data including breadcrumbs
  - Article-specific meta tags (published time, modified time, section, tags)

- **Homepage** (`/pages/index.vue`):
  - Pagination-aware titles and descriptions
  - Homepage-specific structured data
  - Proper canonical URLs for paginated content
  - Featured articles in structured data

- **Author Pages** (`/pages/author/[author].vue`):
  - Author-specific meta data
  - Profile page structured data
  - Article collections structured data

- **Category Pages** (`/pages/category/[category].vue`):
  - Category-specific meta descriptions
  - Collection page structured data
  - Enhanced breadcrumb navigation

### 2. Global Configuration Improvements (`nuxt.config.ts`)
- Enhanced default meta tags
- Proper language attribute (`lang="de"`)
- Title template for consistent branding
- Additional meta tags for better crawling
- Social media meta tags

### 3. Structured Data Implementation
- **Article Schema**: Complete BlogPosting schema with all required fields
- **Website Schema**: Main website information with search functionality
- **Breadcrumb Schema**: Navigation structure for better UX
- **Collection Schema**: For category and author listing pages
- **Person Schema**: For author profiles

### 4. SEO Utilities (`composables/useSeo.js`)
Created a comprehensive SEO utility composable with:
- Consistent meta tag generation
- Structured data helpers
- Image URL formatting
- Content excerpt creation
- Breadcrumb generation

### 5. Technical SEO
- **Robots.txt**: Created proper robots.txt file
- **Sitemap**: Enhanced existing XML sitemap (already implemented)
- **HTML Sitemap**: New user-friendly sitemap page (`/pages/sitemap.vue`)
- **Canonical URLs**: Proper canonical URL implementation across all pages
- **Language Tags**: Proper language and locale metadata

## SEO Features by Page Type

### Blog Index (`/blog`)
- ✅ Dynamic titles for tag filtering
- ✅ Contextual meta descriptions
- ✅ Blog schema with featured articles
- ✅ Tag-based canonical URLs
- ✅ Social media optimization

### Individual Blog Posts (`/blog/[slug]`)
- ✅ Article-specific titles and descriptions
- ✅ Rich Open Graph metadata
- ✅ Article schema with all metadata
- ✅ Breadcrumb navigation
- ✅ Image preloading for performance
- ✅ Author attribution
- ✅ Article dates and modification times

### Homepage (`/`)
- ✅ Website schema
- ✅ Featured content highlighting
- ✅ Pagination-aware SEO
- ✅ Social media profiles linking

### Author Pages (`/author/[author]`)
- ✅ Profile page optimization
- ✅ Author-specific descriptions
- ✅ Article collection display
- ✅ Social media integration ready

### Category Pages (`/category/[category]`)
- ✅ Category-specific optimization
- ✅ Collection page schema
- ✅ Article listing optimization

## Technical Implementation Details

### Meta Tag Management
Using Nuxt's `useSeoMeta` composable for type-safe meta tag management:
```javascript
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  // ... additional meta tags
})
```

### Structured Data
Implementing JSON-LD structured data for better search engine understanding:
```javascript
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify(structuredData.value)
  }]
})
```

### Image Optimization
- Proper image URL handling for Strapi-hosted images
- Fallback to default site icon
- Image preloading for performance

## Best Practices Implemented

1. **Content-First SEO**: All meta tags are dynamically generated from actual content
2. **Mobile-First**: All meta tags are optimized for mobile sharing
3. **Performance-Aware**: Image preloading and efficient asset loading
4. **Accessibility**: Proper language tags and semantic markup
5. **Social Media**: Complete Open Graph and Twitter Card implementation
6. **Search Engine Friendly**: Comprehensive structured data and proper robots.txt

## Monitoring and Maintenance

To maintain good SEO performance:

1. **Regular Content Audits**: Ensure all new content has proper meta descriptions
2. **Image Optimization**: Keep images optimized and properly tagged
3. **Link Maintenance**: Regular checks for broken internal/external links
4. **Performance Monitoring**: Keep Core Web Vitals optimized
5. **Search Console**: Monitor Google Search Console for issues

## Tools for Testing

- **Google Search Console**: Monitor search performance
- **Google Rich Results Test**: Test structured data
- **Facebook Sharing Debugger**: Test Open Graph implementation
- **Twitter Card Validator**: Test Twitter card implementation
- **Lighthouse**: Test overall page performance and SEO

## Next Steps

Consider implementing:
- Schema.org markup for book reviews and ratings
- Enhanced author profile schemas
- Local business schema if applicable
- FAQ schema for relevant content
- Review schema for book reviews
