import { InMemoryCache } from '@apollo/client';
import schema from './schema.json'

export default ({ req, app }) => {
  return {
    // httpEndpoint: 'https://api.flore.nz/graphql',
    httpEndpoint: process.env.STRAPI_EP || 'http://localhost:1337/graphql',
    cache: new InMemoryCache({ possibleTypes: schema.possibleTypes })
  }
}
