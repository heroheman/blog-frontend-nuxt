/* eslint-disable import/no-named-as-default */
import gql from 'graphql-tag'

export const articlesQuery = gql`
  query Articles($start: Int, $limit: Int) {
    articles(
      sort: "display_published_date:DESC"
      start: $start
      limit: $limit
    ) {
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
        title
        slug
      }
      display_published_date
      published_at
      additional {
        ... on ComponentContentRating {
          ratingnumber
        }
        ... on ComponentContentTrack {
          title
          description
          spotify_url
          youtube_url
        }
      }
      tags
    }
  }
`

export const articleQuery = gql`
  query Articles($slug: String!) {
    articles(where: { slug: $slug }) {
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
        title
        slug
      }
      display_published_date
      published_at
      Tags
      additional {
        ... on ComponentContentRating {
          ratingnumber
        }
        ... on ComponentContentTrack {
          title
          description
          spotify_url
          youtube_url
        }
      }
    }
  }
`

export const articlesCount = gql`
  {
    articlesCount
  }
`
