<template>
  <div class="card-container" v-if="id">
    <div class="titulo">
      DroPill {{id}} - Reservatórios
    </div>
    <div class="reservs-container">
      <div class="reserv" v-for="(reserv, index) in reserv_array" :key="index">
        <div class="index-reserv">
          {{index + 1}}
        </div>
        <div class="nome-remedio">
          {{reserv.remedio_nome ? `Remédio: ${reserv.remedio_nome}` : 'Vazio'}}
        </div>
        <div class="fechar" @click.prevent="deleteReceita(reserv, index)">
          X
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    dropill: {required: true}
  },
  data () {

    // console.log(typeof this.dropill)

    let reserv_array = [{}, {}, {}, {}, {}]

    return {
      reserv_array: [{}, {}, {}, {}, {}],
      id: ''
    }
  },
  beforeMount() {
    if (this.dropill == null) return

    this.id = this.dropill.paciente_id

    Object.keys(this.dropill).forEach(key => {
      if (key.includes('reserv')) {
        this.reserv_array[this.dropill[`${key}`].dropill_reserv - 1] = this.dropill[`${key}`]
      }
    })
  },
  methods: {
    async deleteReceita(reserv, index) {
      try {
        let d = await axios({
          method: 'delete',
          url: `${process.env.SERVER_URL}/medico/dropill/${reserv.uuid}`,
        })
        this.reserv_array[index] = {}
        this.$forceUpdate()
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

.reservs-container {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.reserv {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 5fr 1fr;
}

.index-reserv, .fechar {
  background-color: $color-primary;
  color: white;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.nome-remedio {
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-gray;
}

.fechar {
  background-color: red;
  color: black;
  cursor: pointer;
}

.titulo {
  font-weight: bold;
}

.text {
  margin: 1rem 0;
}

</style>