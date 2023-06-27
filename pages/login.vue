<template>
  <div class="yuu-container yuu-login">
    <div>
      <form @submit.prevent="doLogin">
        <div class="mb-10">
          <input
            v-model="form.username"
            type="text"
            :placeholder="$t('USERNAME')"
            class="field--normal"
          />
        </div>
        <div class="mb-20">
          <input
            v-model="form.password"
            type="password"
            :placeholder="$t('PASSWORD')"
            class="field--normal"
          />
        </div>
        <button
          type="submit"
          class="button--green"
        >
          {{ $t('LOGIN') }}
        </button>
      </form>
      <div class="mt-20">
        <NuxtLink to="/" class="btn--link">
          {{ $t('BACK_TO_HOME') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import jwtDecode from 'jwt-decode'
import { login } from '@/services/user.service'
import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '@/constants/config'
import { APP_ROUTES } from '@/constants/app-routes'

useHead({
  title: 'Login',
})
definePageMeta({
  name: 'Login',
  middleware: ['no-auth'],
})

const form = reactive({
  username: '',
  password: '',
})

let accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
let refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)

async function doLogin () {
  if (form.username.trim() && form.password.trim()) {
    const { data, error } = await login({
      username: form.username,
      password: form.password,
    })

    if (!error.value) {
      const accessTokenDecode: any = jwtDecode(data.value.accessToken)
      const refreshTokenDecode: any = jwtDecode(data.value.refreshToken)

      accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY, {
        expires: new Date(accessTokenDecode.exp * 1000),
      })
      accessTokenCookie.value = data.value.accessToken
      refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY, {
        expires: new Date(refreshTokenDecode.exp * 1000),
      })
      refreshTokenCookie.value = data.value.refreshToken

      const { setUserAuth, setCredential, setAuthenticate } = useAuthStore()
      setUserAuth(accessTokenDecode.user)
      setCredential({ accessToken: data.value.accessToken, refreshToken: data.value.refreshToken })
      setAuthenticate(true)

      navigateTo(APP_ROUTES.HOME)
    }
  }
}
</script>
<style scoped lang="scss">
.yuu-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  text-align: center;
}
button {
  cursor: pointer;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
  &:hover {
    color: #fff;
    background-color: #3b8070;
  }
}
.field--normal {
  padding: 5px 10px;
  width: 300px;
  height: 30px;
}
.mt-20 {
  margin-top: 20px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.btn--link {
  color: #666;
  font-size: 0.75rem;
}
</style>
