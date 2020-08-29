<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Bem vindo responsável!
      </h1>
      <small class="subtext">Paciente ID: {{paciente_id}}</small>
      <nuxt-link to="/responsavel/recarga" class="button">
        Solicitar recarga de remédio
      </nuxt-link>
      <DropillCard class="card" :dropill="dropill" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DropillCard from '@/components/Responsavel/DropillCard.vue'
import cookie from '@/mixins/cookies'

import axios from 'axios'

export default {
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {
      let responsavel_id = JSON.parse(cookie.getCookie('login_dropill')).id

      let {data} = await axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/responsavel/${responsavel_id}`
      })

      return {
        dropill: data.receita,
        paciente_id: data.paciente_id
      }

    } catch (error) {
      console.log(error)
    }
  },
  components: {
    Header,
    DropillCard
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.container {
  min-height: 100vh;
}

.page-content {
  padding-top: 4rem;
  display: flex;
  padding-left: 1rem;
  // align-items: center;
  flex-flow: column;
}

.title-container {
  // width: 25vw;
  margin-top: 2rem;
  padding: 1rem;
  // text-align: center;
}

.subtext {
  padding: 0 0 1rem 1rem;
}

.button {
  @include mixin-button;
  width: 15rem;
  margin-left: 1rem;
}

.card {
  margin-top: 1rem;
  margin-left: 1rem;
}

</style>
