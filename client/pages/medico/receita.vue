<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Receita
      </h1>
      <h2 class="title-container">Crie aqui sua receita</h2>
      <form action="" class="form">
        <div class="forms-container">
          <div class="input-container">
            <label for="paciente">
              Nome do paciente + ID
            </label>
            <select name="paciente" id="paciente" v-model="receita.paciente_id">
              <option :value="paciente.id" v-for="paciente in pacientes" :key="paciente.id">
                ID: {{paciente.id}} - {{paciente.nome}}
              </option>
            </select>
          </div>
        </div>
        <div class="forms-container">
          <div class="input-container">
            <label for="nome_remedio">
              Nome do remédio
            </label>
            <input type="text" name="nome_remedio" v-model="receita.remedio_nome">
          </div>
        </div>
        <div class="forms-container">
          <div class="input-container">
            <label for="remedio_dosagem">
              Dosagem do remédio
            </label>
            <input type="text" name="remedio_dosagem" v-model="receita.remedio_dosagem">
          </div>
        </div>      
        <div class="forms-container">
          <div class="input-container">
            <label for="remedio_horario">
              Horário para tomar
            </label>
            <input type="text" name="remedio_horario" v-model="receita.remedio_horario">
          </div>
        </div>
        <div class="forms-container">
          <div class="input-container">
            <label for="dias">
              Por quantos dias
            </label>
            <input type="number" timezone="" name="dias" v-model="receita.dias">
          </div>
        </div>
        <div class="button" @click.prevent="novaReceita(receita)">
          Gerar receita
        </div>         
      </form>         
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  data () {
    return {
      pacientes: [],
      receita: {
        paciente_id: undefined,
        remedio_nome: undefined,
        remedio_dosagem: undefined,
        remedio_horario: undefined,
        dias: undefined
      }
    }
  },
  async beforeMount() {
    try {

      let {data} = await axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/paciente/getAll`
      })

      this.pacientes = data

    } catch (error) {
      
    }

  },
  components: {
    Header
  },
  methods: {
    async novaReceita () {

      try {
        if (Object.values(this.receita).indexOf(undefined) != -1) return alert('Preencha os campos corretamente.')

        let response = await axios({
          method: 'post',
          url: `${process.env.SERVER_URL}/medico/receita/nova`,
          data: this.receita
        })

        console.log(response)
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

</style>
