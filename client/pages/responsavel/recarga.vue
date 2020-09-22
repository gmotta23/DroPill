<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <div class="title-container">
        <h1>Reposição</h1>
      </div>

      <div class="card">
        <div class="text">
          Faça aqui sua reposição
        </div>
        <div class="input-container">
          <label for="qtd">
            Quantidade de comprimidos a serem adicionados
          </label>
          <input type="number" name="qtd" v-model="qtd">
        </div>

        <div class="button" @click.prevent="recarga">
          Enviar
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {
      let remedio = JSON.parse(query.q)
      console.log(remedio)
      return {
        remedio: remedio
      }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      qtd: 0
    }
  },
  components: {
    Header
  },
  methods: {
    async recarga () {

      try {
        if (this.qtd < 1) return alert('Insira uma quantidade maior de comprimidos.')
        if (this.qtd > 15) return alert('O reservatório suporta no máximo 15 comprimidos.')

        let payload = {
          remedio: this.remedio,
          new_qtd: this.qtd
        }

        await axios({
          method: 'put',
          url: `${process.env.SERVER_URL}/responsavel/recarga`,
          data: payload
        })

        this.$router.push('/responsavel')

      } catch (error) {
        
      }

    }
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
  display: grid;
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

.card {
  margin: 3rem 0 0 3rem;
  padding: 1rem 2rem;
  width: 40%;
  height: 25rem;
  border-radius: 1rem;
  border: 1px $color-secondary-blue solid;
  background-color: white;
  .text {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .input-container {
    display: grid;
    gap: .3rem;
    input {
      width: 50%;
    }
  }
  .button {
    margin-top: 1rem;
    background-color: $color-terciary-blue;
    width: max-content;
    justify-self: center;
    padding: 1rem 5rem;
    border-radius: 1rem;
    cursor: pointer;
  }
}

</style>
