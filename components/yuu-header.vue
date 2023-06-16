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
    </div>
  </header>
</template>
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => {
  // @ts-ignore
  return (locales.value).filter(l => l.code !== locale.value)
})
</script>
<style scoped lang="scss">
.yuu-header {
  display: flex;
  justify-content: flex-end;
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
</style>
