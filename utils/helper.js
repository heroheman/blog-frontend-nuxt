import { marked } from 'marked'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

// check of objec has a property
export const hasProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export const objIsNotEmpty = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return true
  }
  return false
}

// Escape characters that would break HTML markup / attributes
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Convert spoiler markdown into CSS-only reveal markup.
 *
 * Syntax:
 *   @spoiler[Der zu versteckende Text]
 *   @spoiler[Der zu versteckende Text | Was gespoilert wird]
 *
 * The hidden text is blurred inline (no block/overlay), so it wraps with the
 * surrounding paragraph. A small always-visible hint label ("Spoiler – click
 * to reveal" or, with a description, "Spoiler: <Beschreibung>") sits in front
 * of it; the same text is also exposed via the title tooltip on hover. Reveal
 * is handled purely via the checkbox hack (see .spoiler styles), so it works
 * inside v-html without any JS event handlers.
 *
 * @param {string} content   raw markdown
 * @param {string} idPrefix  prefix for the checkbox ids (keep unique per render)
 */
export const transformSpoilers = (content, idPrefix = 'spoiler') => {
  if (!content) return content

  let counter = 0
  return content.replace(/@spoiler\[([^\]]+)\]/g, (_match, inner) => {
    counter++
    const [rawText, ...rest] = inner.split('|')
    const text = rawText.trim()
    const description = rest.join('|').trim()
    const hint = description ? `Spoiler: ${description}` : 'Spoiler – click to reveal'
    const safeHint = escapeHtml(hint)
    const id = `${idPrefix}-${counter}`

    return (
      `<span class="spoiler">` +
      `<input type="checkbox" id="${id}" class="spoiler__toggle">` +
      `<label class="spoiler__box" for="${id}" title="${safeHint}">` +
      `<span class="spoiler__hint">${safeHint}</span>` +
      `<span class="spoiler__text">${escapeHtml(text)}</span>` +
      `</label>` +
      `</span>`
    )
  })
}

/**
 * Feed variant: RSS readers can't run the CSS reveal, so spoiler regions are
 * just demarcated with plain "SPOILER … SPOILER_ENDE" text markers.
 *
 * @param {string} content   raw markdown
 */
export const stripSpoilersForFeed = (content) => {
  if (!content) return content

  return content.replace(/@spoiler\[([^\]]+)\]/g, (_match, inner) => {
    const text = inner.split('|')[0].trim()
    return `SPOILER ${text} SPOILER_ENDE`
  })
}

export const formatDate = (dateString, short = false) => {
  const date = new Date(dateString)
  let options
  if (short) {
    options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  } else {
    options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  }
  return date.toLocaleDateString('de-DE', options)
}

// regex check if slug '/page/-3' has a negative number

export const songsAsMarkup = (songArray) => {
  return songArray
    .map(
      (i) =>
        `<h4>${i.title}</h4><p>${
          i.description ? marked(i.description) : ''
        }</p><ul><li><a href="${
          i.spotify_url ? i.spotify_url : ''
        }">Spotify</a></li><li><a href="${
          i.youtube_url ? i.youtube_url : ''
        }">YouTube</a></li></ul>`
    )
    .join('')
}

export const getTracks = (data) => {
  if (data.additional.length) {
    return data.additional.filter((i) => i.__component === 'content.track')
  } else {
    return []
  }
}

export const feedContentParsed = (post) => {
  const tracks = getTracks(post)
  const mdcontent = marked(post.body)
  if (tracks.length) {
    const mdtracks = songsAsMarkup(tracks)
    return mdcontent + mdtracks
  } else if (post.body) {
    return mdcontent
  } else {
    return post.description
  }
}

// create excerpt from string
export const createExcerpt = (str, length) => {
  const excerpt = str.split(' ').slice(0, length).join(' ')
  return excerpt + '...'
}

// clean up from html tags, remove markdown images, remove markdown links
export const cleanUpText = (str) => {
  return (
    str
      .replace(/<[^>]*>/g, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      // remove markdown links and replace it with the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // remove all markdown elements like _, *, ~
      .replace(/[_*~]/g, '')
      .replace(/\n/g, ' ')
  )
}

// Render markdown to HTML
export const renderMarkdown = (markdown) => {
  if (!markdown) return ''
  return marked(markdown)
}

// cleanup text and then create excerpt from string with length
export const createExcerptFromText = (str, length) => {
  const cleaned = cleanUpText(str)
  return createExcerpt(cleaned, length)
}
