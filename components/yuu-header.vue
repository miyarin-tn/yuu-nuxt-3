<template>
  <header>
    <div class="yuu-container--full yuu-header">
      <ul class="yuu-locales">
        <li
          v-for="loc in availableLocales"
          :key="loc.code"
          @click.prevent.stop="setLocale(loc.code)"
        >
          {{ loc.code }}
        </li>
      </ul>
      <div
        v-if="isAuthenticated"
        class="yuu-icon"
        @click="doLogout"
      >
        <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
          />
        </svg>
      </div>
      <NuxtLink
        v-else
        :to="APP_ROUTES.LOGIN"
        class="yuu-link--head"
      >
        {{ $t('LOGIN') }}
      </NuxtLink>
    </div>
  </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { logout } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '@/constants/config'
import { APP_ROUTES } from '@/constants/app-routes'

const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => {
  // @ts-ignore
  return (locales.value).filter(l => l.code !== locale.value)
})

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

async function doLogout () {
  await logout()

  const { setUserAuth, setCredential, setAuthenticate } = useAuthStore()
  setUserAuth(null)
  setCredential({ accessToken: null, refreshToken: null })
  setAuthenticate(false)

  const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
  accessTokenCookie.value = undefined
  const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
  refreshTokenCookie.value = undefined

  navigateTo(APP_ROUTES.LOGIN, { replace: true })
}
</script>
<style scoped lang="scss">
.yuu-header {
  display: flex;
  justify-content: flex-end;
  column-gap: 5px;
}
.yuu-locales {
  display: flex;
  li {
    font-size: 0.75rem;
    text-transform: uppercase;
    padding: 0.5rem 0.25rem;
    cursor: pointer;
    position: relative;
    &:not(:last-of-type) {
      &::after {
        content: '/';
        position: absolute;
        right: -2px;
      }
    }
  }
}
.yuu-icon {
  padding: 0.40rem 0.45rem 0.24rem;
  cursor: pointer;
}
.yuu-link--head {
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.5rem 0.25rem;
}
</style>
