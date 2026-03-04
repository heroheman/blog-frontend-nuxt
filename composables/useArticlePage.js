import qs from 'qs'
import { createExcerptFromText, objIsNotEmpty } from '~/utils/helper'

const ARTICLE_POPULATE = {
  author: true,
  bookseries: true,
  genre_books: true,
  cover: true,
  category: true,
  additional: {
    on: {
      'external-api.book-container': {
        populate: { bookmeta: { populate: '*' } }
      },
      'content.rating': { populate: '*' },
      'content.advertisement': { populate: '*' }
    }
  },
  localizations: true
}

/**
 * @param {object} options
 * @param {'de'|'en'} options.locale
 */
export function useArticlePage({ locale = 'de' } = {}) {
  const route = useRoute()
  const { public: { strapiUrl } } = useRuntimeConfig()

  const isEnglish = locale === 'en'
  const urlBase = isEnglish ? 'https://flore.nz/blog/en' : 'https://flore.nz/blog'
  const alternateLang = isEnglish ? 'de' : 'en'
  const alternateUrlBase = isEnglish ? 'https://flore.nz/blog' : 'https://flore.nz/blog/en'

  const queryObject = {
    ...(isEnglish ? { locale: 'en' } : {}),
    filters: { slug: { $eq: route.params.slug } },
    populate: ARTICLE_POPULATE
  }

  const queryUrl = `/api/articles?${qs.stringify(queryObject, { encodeValuesOnly: true })}`

  const { data: response } = useFetch(queryUrl, { baseURL: strapiUrl })

  const article = computed(() => response.value?.data || [])
  const currentArticle = computed(() => article.value[0] ?? null)

  const pageTitle = computed(() => {
    if (!currentArticle.value) return isEnglish ? 'Article loading... | flore.nz' : 'Artikel wird geladen... | flore.nz'
    return `${currentArticle.value.title} | flore.nz`
  })

  const pageDescription = computed(() => {
    if (!currentArticle.value) return ''
    const description = currentArticle.value.description || currentArticle.value.excerpt
    const bodyExcerpt = createExcerptFromText(currentArticle.value.body || currentArticle.value.content, 30)
    return description ? `${description} - ${bodyExcerpt}` : bodyExcerpt
  })

  const canonicalUrl = computed(() => {
    if (!currentArticle.value) return ''
    return `${urlBase}/${currentArticle.value.slug}`
  })

  const articleImage = computed(() => {
    if (!currentArticle.value?.cover?.url) return 'https://flore.nz/icon.png'
    const imageUrl = currentArticle.value.cover.url
    return imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`
  })

  const publishedDate = computed(() => currentArticle.value?.display_published_date || currentArticle.value?.published_at || currentArticle.value?.createdAt || '')
  const modifiedDate = computed(() => currentArticle.value?.updatedAt || publishedDate.value || '')

  const articleTags = computed(() => {
    if (!currentArticle.value?.tags) return []
    return currentArticle.value.tags.split(',').map(t => t.trim()).filter(Boolean)
  })

  const alternateLocalizationSlug = computed(() => {
    const locs = currentArticle.value?.localizations
    if (!Array.isArray(locs) || locs.length === 0) return null
    return locs.find((l) => l.locale === alternateLang)?.slug || null
  })

  const structuredData = computed(() => {
    if (!currentArticle.value) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: currentArticle.value.title,
      description: pageDescription.value,
      url: canonicalUrl.value,
      datePublished: publishedDate.value,
      dateModified: modifiedDate.value,
      author: { '@type': 'Person', name: 'Florenz', url: 'https://flore.nz' },
      publisher: { '@type': 'Person', name: 'Florenz', url: 'https://flore.nz' },
      image: { '@type': 'ImageObject', url: articleImage.value, width: 1200, height: 630 },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl.value },
      keywords: articleTags.value.join(', '),
      ...(!isEnglish ? { wordCount: currentArticle.value.body?.length || 0, articleSection: currentArticle.value.category?.name || 'Blog' } : {}),
      inLanguage: isEnglish ? 'en' : 'de-DE'
    }
  })

  const breadcrumbStructuredData = computed(() => {
    if (isEnglish || !currentArticle.value) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://flore.nz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://flore.nz/blog' },
        { '@type': 'ListItem', position: 3, name: currentArticle.value.title, item: canonicalUrl.value }
      ]
    }
  })

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    keywords: () => articleTags.value.join(', '),
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogType: 'article',
    ogUrl: canonicalUrl,
    ogImage: articleImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: 'flore.nz',
    articleAuthor: 'Florenz',
    articlePublishedTime: publishedDate,
    articleModifiedTime: modifiedDate,
    articleSection: () => currentArticle.value?.category?.name || 'Blog',
    articleTag: () => articleTags.value,
    robots: 'index, follow, max-image-preview:large',
    canonical: canonicalUrl,
    'og:locale': isEnglish ? 'en_US' : 'de_DE',
    'article:author': 'https://flore.nz'
  })

  useHead(() => {
    const scripts = []
    const links = []

    if (structuredData.value) {
      scripts.push({ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData.value) })
    }
    if (breadcrumbStructuredData.value) {
      scripts.push({ type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbStructuredData.value) })
    }

    links.push({ rel: 'alternate', hreflang: locale, href: canonicalUrl.value })
    if (alternateLocalizationSlug.value) {
      links.push({ rel: 'alternate', hreflang: alternateLang, href: `${alternateUrlBase}/${alternateLocalizationSlug.value}` })
    }
    if (!isEnglish && articleImage.value !== 'https://flore.nz/icon.png') {
      links.push({ rel: 'preload', as: 'image', href: articleImage.value })
    }

    return { script: scripts, link: links }
  })

  return { article, objIsNotEmpty }
}
