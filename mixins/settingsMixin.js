export default {
  data() {
    return {
      settings: {},
    }
  },
  async fetch() {
    try {
      const response = await this.$strapi.get('/global?populate=*')
      // Use Strapi v5 structure directly - no more fake v4 structure
      this.settings = response.data
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
