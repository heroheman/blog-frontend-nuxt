// Override the manifest-route-rule middleware to prevent warnings
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  // This middleware overrides the default manifest-route-rule middleware
  // to prevent the warning about middleware already existing
})
