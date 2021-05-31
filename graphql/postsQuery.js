import gql from 'graphql-tag'

export const postsQuery = gql`
  query Posts {
    posts(sort: "display_published_date:DESC") {
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
      additional {
        ... on ComponentContentRating {
          ratingnumber
        }
        ... on ComponentMediaTrack {
          title
          description
          spotify_url
          youtube_url
        }
      }
      Tags
    }
  }
`

export const postQuery = gql`
  query Posts($slug: String!) {
    posts(where: { slug: $slug }) {
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
      Tags
      additional {
        ... on ComponentContentRating {
          ratingnumber
        }
      }
    }
  }
`
