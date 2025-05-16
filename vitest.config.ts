import { getViteConfig } from 'astro/config'

export default getViteConfig({
  /* for example, use global to avoid globals imports (describe, test, expect): */
  // globals: true,
    preview: {
    allowedHosts: ["selfhost.chrisnowicki.dev"]
  }
})
