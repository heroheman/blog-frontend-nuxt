/* eslint-disable import/no-named-as-default */

import gql from 'graphql-tag'

export const pagesQuery = gql`
  query Pages($slug: String) {
    pages(where: { slug: $slug }) {
      title
      description
      slug
      body
    }
  }
`

// export const postQuery = gql`
//   query Posts($slug: String!) {
//     posts(where: { slug: $slug }) {
//       id
//       slug
//       title
//       description
//       body
//       cover {
//         name
//         alternativeText
//         caption
//         width
//         height
//         previewUrl
//         url
//       }
//       category {
//         Title
//         slug
//       }
//       display_published_date
//       published_at
//       Tags
//       additional {
//         ... on ComponentContentRating {
//           ratingnumber
//         }
//         ... on ComponentMediaTrack {
//           title
//           description
//           spotify_url
//           youtube_url
//         }
//       }
//     }
//   }
// `
