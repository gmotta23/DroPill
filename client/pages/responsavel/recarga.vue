<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Reposição
      </h1>
      <h2 class="title-container">
        Faça aqui sua reposição
      </h2>
      <form class="form">
        <div class="forms-container">
          <div class="input-container">
            <label for="qtd">
              Quantidade de comprimidos a serem adicionados
            </label>
            <input type="number" name="qtd" v-model="qtd">
          </div>
        </div>
      </form>
      <div class="button" @click.prevent="recarga">
        Enviar
      </div>
      <div class="imagem">
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
          method: 'post',
          url: `${process.env.SERVER_URL}/responsavel/recarga`,
          data: payload
        })

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
  padding-top: 4rem;
  display: flex;
  align-items: center;
  padding: 4rem 5rem 0 5rem;
  flex-flow: column;
}

.title-container {
  // margin-top: 2rem;
  text-align: left;
  width: 80%;
  padding: .5rem 1rem;
  // padding: 1rem;
  // text-align: center;
}

form {
  width: 80%;
  padding: 1rem;
}

.forms-container {
  width: 100%;
  // padding: 1rem;
  .input-container {
    display: grid;
    margin: 1rem 0;
  }
}

.button {
  @include mixin-button;
}

.imagem {
  width: 100vw;
  height: 20rem;
  background: url('/img/dp-tech.png');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

</style>
