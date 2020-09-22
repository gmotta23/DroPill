<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Bem vindo responsável!
      </h1>
      <div class="info-container">
        <div class="subtext">Paciente ID: {{paciente_id}}</div>
        <nuxt-link to="/responsavel/relatorio" class="button">
          Ver relatório
        </nuxt-link>
      </div>
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
  padding-top: 6rem;
  display: flex;
  flex-flow: column;
}

.title-container {
  background-color: $color-secondary-blue;
  width: 40%;
  padding: 2rem 0;
  text-align: center;
  border-radius: 0 1rem 1rem 0;
  border: 1px black solid;
  box-shadow: 5px 5px 10px 5px #cccccc;
}

.info-container {
  display: flex;
  align-items: center;
  padding: 1rem 0;
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
  margin: 1rem;
  background-color: white;
}

</style>
