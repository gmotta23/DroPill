<template>
  <div class="card-container">
    <div class="titulo">
      Receita
    </div>
    <div class="nome-remedio text">
      Remédio: {{recarga.remedio.remedio_nome}}
    </div>
    <div class="dosagem text">
      Dosagem: {{recarga.remedio.remedio_dosagem}}
    </div>
    <div class="horario text ">
      Horário: {{recarga.remedio.remedio_horario}}
    </div>
    <div class="dias text">
      Duração: {{recarga.remedio.dias}}
    </div>
    <div class="paciente-id text">
      ID do paciente: {{recarga.remedio.paciente_id}}
    </div>
    <div class="paciente-id text">
      Reservatório da DroPill: {{recarga.remedio.dropill_reserv}}
    </div>
    <div class="paciente-id text">
      ID: {{recarga.remedio.uuid}}
    </div>
    <div class="qtd">
      Quantidade anterior: {{recarga.remedio.qtd}}
    </div>
    <div class="qtd">
      Nova quantidade: {{recarga.new_qtd}}
    </div>
    <div class="gerar-dropill" v-if="!recarga.inserted">
      <div class="button" @click.prevent="recarregar">
        Repor {{recarga.new_qtd}} comprimidos
      </div>
    </div>
    <div class="gerar-dropill" v-else>
      <div class="button">
        Comprimidos inseridos com sucesso!
      </div>
    </div>  
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    recarga: {required: true}
  },
  data () {
    return {
    }
  },
  methods: {
    async recarregar () {
      try {

        await axios({
          method: 'post',
          url: `${process.env.SERVER_URL}/farmacia/recarregar`,
          data: this.recarga
        })

        this.recarga.inserted = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.card-container {
  padding: 1rem;
  border-radius: .5rem;
  border: 1px black solid;
  background-color: white;
}

.titulo {
  font-weight: bold;
}

.text {
  margin: 1rem 0;
}

.qtd {
  margin: 1rem 0;
}

.gerar-dropill {
  .button {
    @include mixin-button;
    color: black;
  }
}

</style>