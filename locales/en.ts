export default defineI18nLocale((locale: string) => {
  return Promise.resolve(en)
  /* ----- translate by external API ----- */
  // return $fetch(`/api/translations/${locale}`)
})

export const en = {
  VERSION: 'Version',
  WELCOME_SITE: 'Welcome to {site} template',
  ITEM: 'no item | 1 item | {count} items',
  GO_BACK_HOME: 'Go back home',
  PAGE_NOT_FOUND: 'Page not found',
  LICENSE: '{name} License',
  TOKEN_EXPIRED: 'Token is expired',
  UNAUTHORIZED: 'Unauthorized',
  USERNAME: 'Username',
  PASSWORD: 'Password',
  LOGIN: 'Login',
  BACK_TO_HOME: 'Back to Home',
}
