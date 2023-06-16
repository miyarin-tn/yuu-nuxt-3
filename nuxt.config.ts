// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // DevTools: https://nuxt.com/docs/api/configuration/nuxt-config#devtools
  devtools: { enabled: true },
  // App config: https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
    // Head config: https://nuxt.com/docs/api/configuration/nuxt-config#head
    head: {
      title: process.env.APP_NAME || 'Yuu Nuxt 3',
      titleTemplate: '%s | Yuu Nuxt 3',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Yuu Nuxt 3 web application' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
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
  // Modules: https://nuxt.com/docs/api/configuration/nuxt-config#modules-1
  modules: [
    // I18n: https://v8.i18n.nuxtjs.org/getting-started/setup#nuxtconfigts
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en.ts',
          },
          {
            code: 'vi',
            iso: 'vi-VN',
            file: 'vi.ts',
          },
        ],
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'en',
        strategy: 'no_prefix',
        experimental: {
          jsTsFormatResource: true,
        },
      },
    ],
  ],
  // Dev server config: https://nuxt.com/docs/api/configuration/nuxt-config#devserver
  devServer: {
    port: Number(process.env.APP_PORT || 3000),
  },
})
