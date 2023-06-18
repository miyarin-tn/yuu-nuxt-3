<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { I18nHeadMetaInfo } from 'vue-i18n-routing'

const i18nHead = useLocaleHead({
  addSeoAttributes: true,
})
watch(i18nHead, (val: I18nHeadMetaInfo) => {
  setHead(val)
})

function setHead (head: I18nHeadMetaInfo) {
  useHead({
    htmlAttrs: {
      lang: head.htmlAttrs!.lang,
    },
    link: [...(head.link || [])],
    meta: [...(head.meta || [])],
  })
}
setHead(i18nHead?.value)
</script>
