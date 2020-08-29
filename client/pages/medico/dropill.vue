<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1>Bem vindo! Médico {{nome}}</h1>
      <Dropills :dropills="dropills" />
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Dropills from '@/components/Medico/Receitas/MedicoGallery'
import cookies from '@/mixins/cookies'

import axios from 'axios'

export default {
  components: {
    Header,
    Dropills
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {

      let cookie = cookies.getCookie('login_dropill')

      let nome = JSON.parse(cookie).nome

      let {data} = await axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/medico/dropills`
      })

      return {
        dropills: data,
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