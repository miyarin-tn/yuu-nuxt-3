module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: [],
  rules: {
    'no-console': 'off',
    'vue/html-self-closing': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'vue/no-v-html': 'off',
  },
}
