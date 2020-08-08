<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        DroPill
      </h1>
      <div class="login-container">
        <div class="title">
          Faça aqui seu login:
        </div>
        <form class="form">
          <label for="email">
            E-mail
          </label>
          <input id="email" type="email" v-model="form.email">
          <label for="password">
            Senha
          </label>
          <input id="password" type="password" v-model="form.senha">
          <div class="button" @click.prevent="login(form)">
            Entrar
          </div>     
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  data () {
    return {
      form: {
        email: '',
        senha: ''
      }
    }
  },
  components: {
    Header
  },
  methods: {
    async login(form) {
      try {
        let {data} = await axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: form
        })

        if (data) {
          console.log(data)
          this.$router.push(`/${data.data}`)
        }

      } catch (error) {
        alert('Credenciais inválidas. Por favor, tente novamente.')
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
  flex-flow: column;
}

.title-container {
  width: 25vw;
  margin-top: 2rem;
  padding: 1rem;
  // text-align: center;
}

.login-container {
  width: 25vw;
  height: 50vh;
  display: flex;
  flex-flow: column;
  padding: 1rem;
}

.form {
  display: flex;
  flex-flow: column;
  align-self: center;
  margin-top: 1rem;
  width: 100%;
  input {
    margin: 1rem 0;
  }
}

.button {
  @include mixin-button;
}

</style>
