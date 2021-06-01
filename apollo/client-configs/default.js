import { InMemoryCache } from '@apollo/client';
import schema from './schema.json'

export default ({ req, app }) => {
  return {
    httpEndpoint: 'https://api.flore.nz/graphql',
    cache: new InMemoryCache({ possibleTypes: schema.possibleTypes })
  }
}
