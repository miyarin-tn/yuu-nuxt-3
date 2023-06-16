<template>
  <footer>
    <div class="yuu-container--full yuu-footer">
      <p class="yuu-copyright">
        ©2023 Yuu - {{ $t('LICENSE', { name: 'MIT' }) }}
      </p>
    </div>
  </footer>
</template>
<style scoped lang="scss">
.yuu-footer {
  border-top: 1px solid #e0e0e0;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.yuu-copyright {
  color: #424242;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
