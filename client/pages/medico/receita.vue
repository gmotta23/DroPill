<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Receita
      </h1>
      <form class="form">
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
        <div class="forms-container">
          <div class="input-container">
            <label for="reserv">
              Qual reservatório da DroPill
            </label>
            <select name="reserv" id="reserv" v-model="receita.dropill_reserv">
              <option :value="reserv" v-for="reserv in 5" :key="reserv">
                Reservatório {{reserv}}
              </option>
            </select>
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
        dias: undefined,
        dropill_reserv: undefined
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

form {
  width: 80%;
  margin-top: 2rem;
  padding: 1rem;
  align-self: center;
  background-color: white;
  border-radius: 1rem;
  border: 1px $color-secondary-blue solid;
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
  width: 30%;
  margin: auto;
  color: black;
  background-color: $color-terciary-blue;
  border-radius: 2rem;
  font-size: 1.4rem;
}

</style>
