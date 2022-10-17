const md = require('markdown-it')().use(require('markdown-it-footnote'))

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

export const songsAsMarkup = (songArray) => {
  return songArray
    .map(
      (i) =>
        `<h4>${i.title}</h4><p>${
          i.description ? md.render(i.description) : ''
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
  const mdcontent = md.render(post.body)
  if (tracks.length) {
    const mdtracks = songsAsMarkup(tracks)
    return mdcontent + mdtracks
  } else if (post.body) {
    return mdcontent
  } else {
    return post.description
  }
}
