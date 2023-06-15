// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // DevTools: https://nuxt.com/docs/api/configuration/nuxt-config#devtools
  devtools: { enabled: true },
  // Vite config: https://nuxt.com/docs/api/configuration/nuxt-config#vite
  vite: {
    // Global sass: https://nuxt.com/docs/getting-started/assets#global-styles-imports
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_global.scss" as *;',
        },
      },
    },
  },
  // Global css: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '@/assets/scss/styles.scss',
  ],
  // Dev server config: https://nuxt.com/docs/api/configuration/nuxt-config#devserver
  devServer: {
    port: Number(process.env.APP_PORT || 3000),
  },
})
