// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // DevTools: https://nuxt.com/docs/api/configuration/nuxt-config#devtools
  devtools: { enabled: true },
  // Global css: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '@/assets/css/styles.css',
  ],
  // Dev server config: https://nuxt.com/docs/api/configuration/nuxt-config#devserver
  devServer: {
    port: Number(process.env.APP_PORT || 3000),
  },
})
