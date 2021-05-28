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
