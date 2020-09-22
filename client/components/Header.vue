<template>
  <header class="header">
    <nuxt-link to="/" class="logo-container">
      <img src="/img/logotipo.png" alt="" class="src">
    </nuxt-link>
    <div class="buttons-container">
      <nuxt-link to="/sobre" class="button">
        Sobre
      </nuxt-link>
      <div v-if="nome" class="button" @click.prevent="handleLogout()">
        Sair
      </div>      
    </div>
  </header>
</template>

<script>

import cookies from '@/mixins/cookies'

export default {
  data () {
    let cookie = cookies.getCookie('login_dropill')
    let nome
    if (cookie) {
      nome = JSON.parse(cookie).nome
    }

    return {
      nome: nome
    }
  },
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

.logo-container {
  height: 100%;
  width: auto;
  img {
    height: 100%;
  }
}

.buttons-container {
  display: flex;
  .button {
    margin: 0 1rem;
    cursor: pointer;
    border: none;
    border-radius: 3rem;
    padding: 0.5rem 1rem;
    background-color: $color-secondary-blue;
    color: black;
  }
}

</style>