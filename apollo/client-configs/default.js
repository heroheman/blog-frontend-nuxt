import { InMemoryCache } from '@apollo/client';
import schema from './schema.json'

export default ({ req, app }) => {
  return {
    httpEndpoint: process.env.NUXT_ENV_STRAPI_EP,
    cache: new InMemoryCache({ possibleTypes: schema.possibleTypes })
  }
}
