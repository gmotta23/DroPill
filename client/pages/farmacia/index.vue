<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1>Bem vindo! Farmácia {{nome}}</h1>
      <nuxt-link class="button" to="/farmacia/reposicao">
        Pedidos de reposição
      </nuxt-link>
      <Receitas :receitas="receitas" />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Receitas from '@/components/Farmacia/Receitas/Gallery'
import cookies from '@/mixins/cookies'

import axios from 'axios'

export default {
  components: {
    Header,
    Receitas
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {

      let cookie = cookies.getCookie('login_dropill')

      let nome = JSON.parse(cookie).nome

      let {data} = await axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/farmacia/receitas`
      })

      return {
        receitas: data.reverse(),
        nome: nome
      }

    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.page-content {
  padding-top: 4rem;
}

h1 {
  padding: 1rem;
  text-align: center;
}

.button {
  @include mixin-button;
  width: max-content;
  margin: 1rem 0 1rem 10rem;
  color: black;
  padding: 1rem 5rem;
  background-color: $color-secondary-blue;
  border: 1px black solid;
  box-shadow: 5px 5px 5px 3px #cccccc;
  border-radius: 1rem;
}
</style>