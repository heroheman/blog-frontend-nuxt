import gql from 'graphql-tag'

export const postsQuery = gql`
  query Posts {
    posts {
      id
      slug
      title
      description
      body
      cover {
        name
        alternativeText
        caption
        width
        height
        previewUrl
        url
      }
      category {
        Title
        slug
      }
      display_published_date
      published_at
    }
  }
`
