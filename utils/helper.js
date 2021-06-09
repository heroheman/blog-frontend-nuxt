const md = require('markdown-it')().use(require('markdown-it-footnote'))

export const formatDate = (dateString, short = false) => {
  const date = new Date(dateString)
  let options
  if (short) {
    options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  } else {
    options = { year: 'numeric', month: 'long', day: 'numeric' }
  }
  return date.toLocaleDateString('de-DE', options)
}

export const songsAsMarkup = (songArray) => {
  return songArray
    .map(
      (i) =>
        `<h4>${i.title}</h4><p>${
          i.description ? md.render(i.description) : ''
        }</p><ul><li>${i.spotify_url ? i.spotify_url : ''}</li><li>${
          i.youtube_url ? i.youtube_url : ''
        }</li></ul>`
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
