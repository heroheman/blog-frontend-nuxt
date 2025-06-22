export default ({ app, $axios }, inject) => {
  const strapi = {
    baseURL: app.$config.strapiUrl || 'http://localhost:1337',

    // Helper method to make API calls with query params
    async find(contentType, params = {}) {
      const query = new URLSearchParams(params).toString()
      const url = query ? `${contentType}?${query}` : contentType
      return await $axios.$get(`/api/${url}`)
    },

    // Direct GET method with query params support
    async get(endpoint, options = {}) {
      const { params = {} } = options
      const query = new URLSearchParams(params).toString()
      const url = query ? `${endpoint}?${query}` : endpoint
      const fullUrl = endpoint.startsWith('/api/') ? url : `/api${url}`
      return await $axios.$get(fullUrl)
    },

    async findOne(contentType, id, params = {}) {
      const query = new URLSearchParams(params).toString()
      const url = query ? `${contentType}/${id}?${query}` : `${contentType}/${id}`
      return await $axios.$get(`/api/${url}`)
    },

    async create(contentType, data) {
      return await $axios.$post(`/api/${contentType}`, { data })
    },

    async update(contentType, id, data) {
      return await $axios.$put(`/api/${contentType}/${id}`, { data })
    },

    async delete(contentType, id) {
      return await $axios.$delete(`/api/${contentType}/${id}`)
    }
  }

  inject('strapi', strapi)
}
