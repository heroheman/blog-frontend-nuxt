export default {
  data() {
    return {
      settings: {},
    }
  },
  async fetch() {
    try {
      const response = await fetch('https://flrnz.strapi.florenz.dev/api/global?populate=*')
      const payload = await response.json()
      // Use Strapi v5 structure directly - no more fake v4 structure
      this.settings = payload.data
    } catch (error) {
      console.error('Error fetching global settings:', error)
      // Fallback settings to prevent errors
      this.settings = {
        sitetitle: 'flore.nz',
        sitedescription: 'The personal website of Florenz',
        Phrases: []
      }
    }
  },
  fetchOnServer: true,
}
