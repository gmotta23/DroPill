<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">

@import '@/assets/scss/index.scss';

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: $color-background-blue;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: white;
  text-decoration: none;
}
</style>
