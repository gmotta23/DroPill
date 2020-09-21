<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Relatório do paciente {{paciente_id}}
      </h1>
      <div class="relatorio">
        <table>
          <tr>
            <th>
              Horário
            </th>
            <th>
              Remédio
            </th>
            <th>
              Tempo
            </th>
            <th>
              Comprimidos
            </th>
            <th>
              Status
            </th>
          </tr>
          <tr v-for="(linha, index) in relatorio" :key="index" :style="`background-color: ${stateColor(linha.data.status)}`">
            <td>{{linha.time}}</td>
            <td v-for="(reserv, index2) in linha.data" :key="index2">
              {{reserv}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
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
  data () {
    return {
      relatorio: {}
    }
  },
  async mounted () {
    try {
      let {data} = await axios({
        method: 'get',
        url: 'http://localhost:2999/device/relatorio'
      })

      let formatted_data = []

      Object.keys(data).forEach(update => {

        data[`${update}`].forEach(action => {
          if (action.status !== -1) {
            let row = {
              time: update,
              data: action
            }
            formatted_data.push(row)
          }
        })
      })

      this.relatorio = formatted_data
    } catch (error) {
      
    }
  },
  methods: {
    stateColor(status) {
      let color

      console.log(status)

      switch (status) {
        case -1:
          color = '#000000'
          break;
        case 0:
          color = 'green'
          break;
        case 1:
          color = 'yellow'
          break;
        case 2:
          color = 'red'
          break;
      }
      return color
    }
  },
  components: {
    Header,
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.page-content {
  padding-top: 4rem;
  display: flex;
  // padding-left: 1rem;
  justify-content: center;
  // align-items: center;
  flex-flow: column;
}

.title-container {
  // width: 25vw;
  margin-top: 2rem;
  padding: 1rem;
  // text-align: center;
}

.button {
  @include mixin-button;
  width: 15rem;
  margin-left: 1rem;
}

table {
  width: 100%;
  border: 1px black solid;
  border-collapse: collapse;
  box-shadow: 2px 5px 10px #888888;
  text-align: center;
}

th {
  background-color: #2e2ca7;
  color: white;
  padding: 1rem;
  border: 1px black solid;
}

tr, td {
  padding: 0.5rem 1rem;
  border: 1px black solid;
}


</style>
