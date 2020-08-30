<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1>Pedidos de Reposição - Farmácia {{nome}}</h1>
      <Recargas :recargas="recargas" />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Recargas from '@/components/Farmacia/Recargas/Gallery'
import cookies from '@/mixins/cookies'

import axios from 'axios'

export default {
  components: {
    Header,
    Recargas
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {

      let cookie = cookies.getCookie('login_dropill')

      let nome = JSON.parse(cookie).nome

      let {data} = await axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/farmacia/recargas`
      })

      return {
        recargas: data.reverse(),
        nome: nome
      }

    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" scoped>

.page-content {
  padding-top: 4rem;
}

h1 {
  padding: 1rem;
}
</style>