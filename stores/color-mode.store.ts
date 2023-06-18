export const useColorModeStore = defineStore('color-mode', () => {
  const colorMode = ref<'light' | 'dark'>('light')

  const currentColorMode = computed(() => colorMode)

  function setColorMode (mode: 'light' | 'dark') {
    colorMode.value = mode
  }

  return {
    colorMode,
    currentColorMode,
    setColorMode,
  }
})
