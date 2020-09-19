<template>
  <div class="container">
    <div class="page-content">
      <div class="left-container">
        <div class="dropill-small">
          <img src="/img/logotipo.png" alt="">
        </div>
        <div class="dropill-big">
          <div class="logo-container">

          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="login-container">
          <div class="titulo">
            LOGIN
          </div>
          <div class="form">
            <div class="input-container">
              <input type="text" v-model="form.email">
              <label for="email">E-mail</label>
            </div>
            <div class="input-container">
              <input type="password" v-model="form.senha">
              <label for="email">Senha</label>
            </div>            
          </div>
          <button class="button" @click.prevent="login(form)">
            ENTRAR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import cookies from '@/mixins/cookies'

import axios from 'axios'

export default {
  data () {
    return {
      form: {
        email: 'medico_2@dropill.com',
        senha: 'medico1234'
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
          url: `${process.env.SERVER_URL}/user/login`,
          data: form
        })

        if (data) {
          cookies.setCookie('login_dropill', data.data)
          // salvar como cookie os dados do login
          this.$router.push(`/${data.data.tipo}`)
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
  display: grid;
}

.page-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100%;
  background-color: #b8eee5;
}

.left-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  .dropill-small {
    padding: 4rem;
    img {
      height: 10rem;
    }
  }
  .dropill-big {
    background-color: white;
    border-radius: 2rem;
    padding: 2rem;
    margin: 4rem;
    .logo-container {
      background: url('/img/dp-tech.png');
      background-repeat: no-repeat;
      background-size: contain;
      height: 100%;
      width: 100%;
    }
  }
}

.right-container {
  padding: 4rem 2rem;
  display: grid;
  .login-container {
    background-color: white;
    border-radius: 2rem;
    display: grid;
    text-align: center;
    padding: 4rem 2rem;
    .titulo {
      font-weight: bold;
      font-size: 2rem;
    }
    .form {
      // display: grid;
      gap: .3rem;
      padding: 0 2rem;
      .input-container {
        display: grid;
        text-align: left;
        margin: 1rem 0;
        input {
          height: 2rem;
          margin: .5rem 0;
          border-color: black;
          border-width: 0 0 1px 0;
          outline: 0;
          &:focus {
            border-color:  #317eaa;
          }
          // width: 15rem;
        }
        label {
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }
    .button {
      width: calc(100% - 4rem);
      // margin: 0 2rem;
      justify-self: center;
      font-weight: bold;
      font-size: 2rem;
      border: 0;
      outline: 0;
      cursor: pointer;
      border-radius: 1rem;
      padding: 2rem;
      background-color: #317eaa;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      box-shadow: 2px 5px 10px #888888;
      &:active {
        transform: translateY(4px);
      }
    }
  }
}

</style>
