<template>
  <header class="header">
    <div class="logo-container">
      <nuxt-link to="/" class="logo">
        Logo DroPill
      </nuxt-link>
    </div>
    <div class="buttons-container">
      <nuxt-link to="/sobre" class="button">
        Sobre
      </nuxt-link>
      <div class="button" @click.prevent="handleLogout()">
        Sair
      </div>      
    </div>
  </header>
</template>

<script>

import cookies from '@/mixins/cookies'

export default {
  methods: {
    handleLogout() {
      try {
        cookies.setCookie('login_dropill', {})
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.header {
  background-color: $color-primary;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  color: white;
}

.buttons-container {
  display: flex;
  .button {
    margin: 0 1rem;
    cursor: pointer;
  }
}

</style>