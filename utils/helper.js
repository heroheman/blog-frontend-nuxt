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
