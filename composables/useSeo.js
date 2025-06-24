/**
 * Global SEO composable for flore.nz
 * Provides consistent SEO utilities across the application
 */
export const useSeo = () => {
  const config = useRuntimeConfig()

  // Site defaults
  const siteDefaults = {
    siteName: 'flore.nz',
    siteUrl: 'https://flore.nz',
    defaultImage: 'https://flore.nz/icon.png',
    defaultImageWidth: 512,
    defaultImageHeight: 512,
    // Twitter entfernt - kein Twitter Account vorhanden
    author: 'Florenz',
    locale: 'de_DE',
    language: 'de'
  }

  /**
   * Generate base SEO meta tags
   * @param {Object} options - SEO options
   * @returns {Object} - SEO meta object
   */
  const generateSeoMeta = (options = {}) => {
    const {
      title,
      description,
      image = siteDefaults.defaultImage,
      imageWidth = siteDefaults.defaultImageWidth,
      imageHeight = siteDefaults.defaultImageHeight,
      url,
      type = 'website',
      canonical,
      noindex = false,
      keywords,
      publishedTime,
      modifiedTime,
      section,
      tags = []
    } = options

    const seoMeta = {
      title,
      description,

      // Open Graph
      ogTitle: title,
      ogDescription: description,
      ogType: type,
      ogUrl: url || canonical,
      ogImage: image,
      ogImageWidth: imageWidth,
      ogImageHeight: imageHeight,
      ogSiteName: siteDefaults.siteName,
      ogLocale: siteDefaults.locale,

      // Twitter - entfernt da kein Twitter Account vorhanden

      // Additional meta
      robots: noindex ? 'noindex, follow' : 'index, follow',
      canonical: canonical || url
    }

    // Add optional fields
    if (keywords) seoMeta.keywords = keywords
    if (publishedTime) seoMeta.articlePublishedTime = publishedTime
    if (modifiedTime) seoMeta.articleModifiedTime = modifiedTime
    if (section) seoMeta.articleSection = section
    if (tags.length > 0) seoMeta.articleTag = tags

    return seoMeta
  }

  /**
   * Generate breadcrumb structured data
   * @param {Array} breadcrumbs - Array of breadcrumb objects {name, url}
   * @returns {Object} - Breadcrumb structured data
   */
  const generateBreadcrumb = (breadcrumbs) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  }

  /**
   * Generate article structured data
   * @param {Object} article - Article data
   * @returns {Object} - Article structured data
   */
  const generateArticleStructuredData = (article) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description || article.excerpt,
      url: `${siteDefaults.siteUrl}/blog/${article.slug}`,
      datePublished: article.publishedTime || article.published_at,
      dateModified: article.modifiedTime || article.updatedAt,
      author: {
        '@type': 'Person',
        name: article.author?.name || siteDefaults.author,
        url: article.author?.url || siteDefaults.siteUrl
      },
      publisher: {
        '@type': 'Person',
        name: siteDefaults.author,
        url: siteDefaults.siteUrl
      },
      image: {
        '@type': 'ImageObject',
        url: article.image || siteDefaults.defaultImage,
        width: article.imageWidth || siteDefaults.defaultImageWidth,
        height: article.imageHeight || siteDefaults.defaultImageHeight
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteDefaults.siteUrl}/blog/${article.slug}`
      },
      keywords: article.keywords || (article.tags ? article.tags.join(', ') : ''),
      wordCount: article.wordCount || 0,
      articleSection: article.section || 'Blog',
      inLanguage: siteDefaults.language
    }
  }

  /**
   * Generate website structured data
   * @param {Object} options - Website options
   * @returns {Object} - Website structured data
   */
  const generateWebsiteStructuredData = (options = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: options.name || siteDefaults.siteName,
      description: options.description,
      url: options.url || siteDefaults.siteUrl,
      author: {
        '@type': 'Person',
        name: siteDefaults.author,
        url: siteDefaults.siteUrl,
        sameAs: [
          'https://norden.social/@florenz',
          'https://github.com/florenz',
          'https://www.goodreads.com/florenz'
        ]
      },
      publisher: {
        '@type': 'Person',
        name: siteDefaults.author,
        url: siteDefaults.siteUrl
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteDefaults.siteUrl}/blog?tag={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      inLanguage: siteDefaults.language
    }
  }

  /**
   * Generate collection page structured data
   * @param {Object} collection - Collection data
   * @param {Array} items - Collection items
   * @returns {Object} - Collection structured data
   */
  const generateCollectionStructuredData = (collection, items = []) => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection.name,
      description: collection.description,
      url: collection.url
    }

    if (items.length > 0) {
      structuredData.mainEntity = {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'BlogPosting',
            headline: item.title,
            description: item.description || item.excerpt,
            url: `${siteDefaults.siteUrl}/blog/${item.slug}`,
            datePublished: item.publishedTime || item.published_at,
            author: {
              '@type': 'Person',
              name: item.author?.name || siteDefaults.author
            }
          }
        }))
      }
    }

    return structuredData
  }

  /**
   * Helper to extract excerpt from HTML content
   * @param {string} content - HTML content
   * @param {number} wordLimit - Word limit for excerpt
   * @returns {string} - Plain text excerpt
   */
  const createExcerpt = (content, wordLimit = 30) => {
    if (!content) return ''

    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    const words = plainText.split(' ')

    if (words.length <= wordLimit) return plainText

    return words.slice(0, wordLimit).join(' ') + '...'
  }

  /**
   * Helper to format image URL
   * @param {string} imageUrl - Image URL (may be relative)
   * @param {string} baseUrl - Base URL for relative images
   * @returns {string} - Absolute image URL
   */
  const formatImageUrl = (imageUrl, baseUrl = config.public.strapiUrl) => {
    if (!imageUrl) return siteDefaults.defaultImage
    if (imageUrl.startsWith('http')) return imageUrl
    return `${baseUrl}${imageUrl}`
  }

  return {
    siteDefaults,
    generateSeoMeta,
    generateBreadcrumb,
    generateArticleStructuredData,
    generateWebsiteStructuredData,
    generateCollectionStructuredData,
    createExcerpt,
    formatImageUrl
  }
}
