import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import { APP_ROUTES } from '@/constants/app-routes'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  if (isAuthenticated.value) {
    if (!isEqual(to, from)) {
      return navigateTo(from)
    } else {
      return navigateTo(APP_ROUTES.HOME)
    }
  }
})
