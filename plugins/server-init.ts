import { useAuthStore } from '@/stores/auth.store'

export default defineNuxtPlugin(async (nuxtApp) => {
  // @ts-ignore
  const store = useAuthStore(nuxtApp.$pinia)
  await store.nuxtServerInit()
})
