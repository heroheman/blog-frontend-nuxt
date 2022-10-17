export default {
  data() {
    return {
      settings: {},
    }
  },
  async fetch() {
    this.settings = await this.$strapi.find('global', {
      populate: '*', // populate all relations
    })
  },
  fetchOnServer: true,
}
