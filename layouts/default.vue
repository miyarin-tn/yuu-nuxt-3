<template>
  <div>
    <yuu-header />
    <slot></slot>
    <yuu-footer />
  </div>
</template>
<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'yuu-layout-default',
  },
})
</script>
<style scoped lang="scss">
.yuu-layout-default {
  display: inherit;
}
</style>
