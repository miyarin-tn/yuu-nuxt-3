<template>
  <div
    class="yuu-error"
    :class="{
      // @ts-ignore
      'yuu-error--center': !error?.stack,
      // @ts-ignore
      'yuu-error--stack': error?.stack,
    }"
  >
    <h1 class="yuu-error--code">
      {{
        // @ts-ignore
        error?.statusCode
      }}
    </h1>
    <p class="yuu-error--message">
      {{
        // @ts-ignore
        error?.message
      }}
    </p>
    <div
      v-if="
        // @ts-ignore
        error?.stack
      "
      class="yuu-error--stack__box"
    >
      <pre
        class="yuu-error--stack__code"
        v-html="
          // @ts-ignore
          error?.stack
        "
      ></pre>
    </div>
    <div v-else class="yuu-error--go-back">
      <NuxtLink to="/">
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const error = useError()
useHead({
  // @ts-ignore
  title: `${error.value?.statusCode} - ${error.value?.statusMessage}`,
})
</script>

<style scoped lang="scss">
$classRoot: '.yuu-error';
#{$classRoot} {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &--center {
    align-items: center;
    justify-content: center;
    #{$classRoot}--code {
      font-size: 6rem;
      margin-bottom: 2rem;
      @media (min-width: 640px) {
        font-size: 10rem;
      }
    }
    #{$classRoot}--message {
      margin-bottom: 4rem;
      @media (min-width: 640px) {
        font-size: 2.25rem;
        line-height: 2.5rem;
      }
    }
  }
  &--stack {
    padding: 3.5rem 2.5rem;
    #{$classRoot}--code {
      font-size: 3.75rem;
      margin-bottom: 1.5rem;
      @media (min-width: 640px) {
        font-size: 6rem;
      }
    }
    #{$classRoot}--message {
      margin-bottom: 2rem;
      @media (min-width: 640px) {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    }
  }
  &--code {
    font-weight: 500;
    line-height: 1;
  }
  &--message {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 300;
  }
  &--stack__box {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 2rem;
  }
  &--go-back {
    display: flex;
    a {
      background-color: rgba(255, 255, 255, 0.3);
      position: relative;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      backdrop-filter: blur(10px);
      @media (min-width: 640px) {
        font-size: 1.25rem;
        line-height: 1.75rem;
        padding: 0.75rem 1.5rem;
      }
      &:hover {
        &::before {
          background-position: -50% 0;
          opacity: 1;
        }
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0.5rem;
        padding: 2px;
        width: 100%;
        background: linear-gradient(90deg, #e2e2e2 0%, #e2e2e2 25%, #999 50%, #333 75%, #000 100%);
        background-size: 400% auto;
        opacity: 0.5;
        transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    }
  }
}
</style>
