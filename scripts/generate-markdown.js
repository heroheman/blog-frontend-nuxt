#!/usr/bin/env node

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper function to sanitize filename
const sanitizeFilename = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\-_.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper function to format date for frontmatter
const formatDateForFrontmatter = (dateString) => {
  if (!dateString) return new Date().toISOString()
  return new Date(dateString).toISOString()
}

// Helper function to extract tags
const extractTags = (tagsString) => {
  if (!tagsString) return []
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

// Helper function to extract additional components
const extractAdditionalComponents = (additional) => {
  if (!additional || !Array.isArray(additional)) return {}

  const result = {}

  additional.forEach(component => {
    switch (component.__component) {
      case 'content.rating':
        result.rating = component.ratingnumber
        break
      case 'external-api.book-container':
      case 'external-api.open-library-isbn':
        if (!result.book_data) result.book_data = []
        if (component.__component === 'external-api.book-container' && component.bookmeta) {
          result.book_data.push(...component.bookmeta)
        } else if (component.__component === 'external-api.open-library-isbn') {
          result.book_data.push(component)
        }
        break
      case 'content.track':
        if (!result.songs) result.songs = []
        result.songs.push(component)
        break
      case 'content.track-container':
        if (!result.songs) result.songs = []
        if (component.songs) {
          result.songs.push(...component.songs)
        }
        break
    }
  })

  return result
}

// Generate frontmatter YAML
const generateFrontmatter = (post) => {
  const additionalData = extractAdditionalComponents(post.additional)
  const tags = extractTags(post.tags)

  const frontmatter = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: post.description || '',
    createdAt: formatDateForFrontmatter(post.createdAt),
    updatedAt: formatDateForFrontmatter(post.updatedAt),
    display_published_date: formatDateForFrontmatter(post.display_published_date),
    draft: true,
    tags: tags.length > 0 ? tags : null,
    cover_url: post.cover_url || null,
    category_id: post.category?.id || null,
    category: post.category?.name || null
  }

    // Add book-related data with proper object handling
  if (post.author && Array.isArray(post.author) && post.author.length > 0) {
    const authors = post.author.map((a) => {
      if (typeof a === 'object' && a !== null) {
        return a.name || a.title || JSON.stringify(a)
      }
      return String(a)
    }).filter(name => name && name !== '[object Object]')

    if (authors.length > 0) {
      frontmatter.book_author = authors
    }
  } else if (post.author && typeof post.author === 'string') {
    frontmatter.book_author = [post.author]
  }

  if (post.bookseries && Array.isArray(post.bookseries) && post.bookseries.length > 0) {
    const series = post.bookseries.map((s) => {
      if (typeof s === 'object' && s !== null) {
        return s.name || s.title || JSON.stringify(s)
      }
      return String(s)
    }).filter(name => name && name !== '[object Object]')

    if (series.length > 0) {
      frontmatter.book_series = series
    }
  } else if (post.bookseries && typeof post.bookseries === 'string') {
    frontmatter.book_series = [post.bookseries]
  }

  if (post.genre_books && Array.isArray(post.genre_books) && post.genre_books.length > 0) {
    const genres = post.genre_books.map((g) => {
      if (typeof g === 'object' && g !== null) {
        return g.name || g.title || JSON.stringify(g)
      }
      return String(g)
    }).filter(name => name && name !== '[object Object]')

    if (genres.length > 0) {
      frontmatter.book_genres = genres
    }
  } else if (post.genre_books && typeof post.genre_books === 'string') {
    frontmatter.book_genres = [post.genre_books]
  }

  // Add additional component data
  if (additionalData.rating) {
    frontmatter.rating = additionalData.rating
  }

  if (additionalData.book_data && additionalData.book_data.length > 0) {
    const firstBook = additionalData.book_data[0]
    if (firstBook.isbn) frontmatter.isbn = firstBook.isbn
    if (firstBook.amazonRefUrl) frontmatter.amazon_url = firstBook.amazonRefUrl
    if (firstBook.genialokalRefUrl) frontmatter.ref_url = firstBook.genialokalRefUrl
  }

  // Clean up null values
  Object.keys(frontmatter).forEach(key => {
    if (frontmatter[key] === null || frontmatter[key] === undefined) {
      delete frontmatter[key]
    }
  })

  // Convert to YAML format
  let yamlString = '---\n'

  Object.entries(frontmatter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return
      yamlString += `${key}:\n`
      value.forEach(item => {
        // Handle strings that contain quotes or special characters
        const itemStr = String(item)
        if (itemStr.includes('"') || itemStr.includes("'") || itemStr.includes(':') || itemStr.includes('#')) {
          yamlString += `  - "${itemStr.replace(/"/g, '\\"')}"\n`
        } else {
          yamlString += `  - "${itemStr}"\n`
        }
      })
    } else if (typeof value === 'string') {
      // Handle strings that need escaping
      if (value.includes('"') || value.includes("'") || value.includes(':') || value.includes('#') || value.includes('\n')) {
        const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
        yamlString += `${key}: "${escapedValue}"\n`
      } else {
        yamlString += `${key}: "${value}"\n`
      }
    } else {
      yamlString += `${key}: ${value}\n`
    }
  })

  yamlString += '---\n\n'

  return yamlString
}

// Generate markdown file content
const generateMarkdownContent = (post) => {
  const frontmatter = generateFrontmatter(post)
  const body = post.body || post.description || ''

  return frontmatter + body
}

// Helper function to sanitize category name for directory
const sanitizeCategoryName = (categoryName) => {
  if (!categoryName) return 'uncategorized'

  // Handle category objects
  let name = categoryName
  if (typeof categoryName === 'object' && categoryName !== null) {
    name = categoryName.name || categoryName.title || 'uncategorized'
  }

  // Ensure we have a string
  name = String(name)

  return name
    .toLowerCase()
    // Replace umlauts
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    // Replace other special characters
    .replace(/[^a-z0-9\-_.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper function to clean content directory
const cleanContentDirectory = async (contentDir) => {
  try {
    const items = await fs.readdir(contentDir)

    for (const item of items) {
      const itemPath = path.join(contentDir, item)
      const stat = await fs.stat(itemPath)

      if (stat.isDirectory()) {
        // Remove directory and all its contents
        await fs.rm(itemPath, { recursive: true, force: true })
        console.log(`🗑️  Removed directory: ${item}`)
      } else if (item.endsWith('.md')) {
        // Remove markdown files
        await fs.unlink(itemPath)
        console.log(`🗑️  Removed file: ${item}`)
      }
    }
  } catch (error) {
    // Directory doesn't exist or is empty, that's fine
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️  Warning cleaning content directory: ${error.message}`)
    }
  }
}// Main function to generate markdown files
const generateMarkdownFiles = async () => {
  const BLOG_EP = process.env.STRAPI_URL || 'https://flrnz.strapi.florenz.dev'
  const contentDir = path.resolve(process.cwd(), 'content')

  try {
    console.log('🚀 Starting markdown generation...')

    // Ensure content directory exists
    try {
      await fs.access(contentDir)
    } catch {
      await fs.mkdir(contentDir, { recursive: true })
      console.log('📁 Created content directory')
    }

    // Clean existing content
    console.log('🧹 Cleaning existing content...')
    await cleanContentDirectory(contentDir)

    // Fetch all articles from Strapi API
    console.log('📡 Fetching articles from API...')
    const response = await fetch(`${BLOG_EP}/api/articles?populate=*&pagination[pageSize]=200&sort=display_published_date:DESC`)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response format')
    }

    const posts = data.data
    console.log(`📄 Found ${posts.length} articles to process`)

    // Generate markdown files
    let successCount = 0
    let errorCount = 0
    const createdDirectories = new Set()

    for (const post of posts) {
      try {
        if (!post.slug) {
          console.warn(`⚠️  Skipping article "${post.title}" - no slug`)
          continue
        }

        // Determine category directory
        const categoryName = sanitizeCategoryName(post.category?.name || post.category)
        const categoryDir = path.join(contentDir, categoryName)

        // Create category directory if it doesn't exist
        if (!createdDirectories.has(categoryName)) {
          try {
            await fs.access(categoryDir)
          } catch {
            await fs.mkdir(categoryDir, { recursive: true })
            console.log(`📁 Created category directory: ${categoryName}`)
          }
          createdDirectories.add(categoryName)
        }

        const filename = `${sanitizeFilename(post.slug)}.md`
        const filepath = path.join(categoryDir, filename)
        const content = generateMarkdownContent(post)

        await fs.writeFile(filepath, content, 'utf8')

        console.log(`✅ Generated: ${categoryName}/${filename}`)
        successCount++

      } catch (error) {
        console.error(`❌ Error generating file for "${post.title}":`, error)
        errorCount++
      }
    }    console.log('\n🎉 Markdown generation completed!')
    console.log(`✅ Successfully generated: ${successCount} files`)
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} files`)
    }
    console.log(`📁 Files saved to: ${contentDir}`)

  } catch (error) {
    console.error('💥 Error during markdown generation:', error)
    process.exit(1)
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMarkdownFiles()
}

export { generateMarkdownFiles }
