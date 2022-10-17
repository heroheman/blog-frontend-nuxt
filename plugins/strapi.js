import Strapi from 'strapi-sdk-js'

export default ({ app }, inject) => {
  const strapi = new Strapi({
    url: app.$config.strapiUrl || 'http://localhost:1337',
  })

  inject('strapi', strapi)
}
