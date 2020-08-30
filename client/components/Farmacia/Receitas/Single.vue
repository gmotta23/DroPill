<template>
  <div class="card-container">
    <div class="titulo">
      Receita
    </div>
    <div class="nome-remedio text">
      Remédio: {{receita.remedio_nome}}
    </div>
    <div class="dosagem text">
      Dosagem: {{receita.remedio_dosagem}}
    </div>
    <div class="horario text ">
      Horário: {{receita.remedio_horario}}
    </div>
    <div class="dias text">
      Duração: {{receita.dias}}
    </div>
    <div class="paciente-id text">
      ID do paciente: {{receita.paciente_id}}
    </div>
    <div class="paciente-id text">
      Reservatório da DroPill: {{receita.dropill_reserv}}
    </div>
    <div class="paciente-id text">
      ID: {{receita.uuid}}
    </div>
    <div class="qtd" v-if="isSelected">
      <label class="text">
        Quantos comprimidos?
      </label>
      <input type="number" v-model="qtd">
    </div>
    <div class="gerar-dropill" v-if="!receita.inserted">
      <div class="button" @click.prevent="gerarDroPill">
        Gerar DroPill!
      </div>
    </div>
    <div class="gerar-dropill" v-else>
      <div class="button">
        DroPill inserida!
      </div>
    </div>    
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    receita: {required: true}
  },
  data () {
    return {
      isSelected: false,
      qtd: 0
    }
  },
  methods: {
    async gerarDroPill () {
      try {

        if (this.isSelected) {
          if (this.qtd < 1) return alert('Insira uma quantidade maior de comprimidos.')
          if (this.qtd > 15) return alert('O reservatório suporta no máximo 15 comprimidos.')

          this.receita.qtd = parseInt(this.qtd)

          let response = await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/farmacia/newDrop`,
            data: this.receita
          })

          this.receita.inserted = true
          return this.isSelected = false
        }

        this.isSelected = true

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
  }
}

</style>