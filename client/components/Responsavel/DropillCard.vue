<template>
  <div class="card-container">
    <div class="titulo">
      DroPill {{id}} - Reservatórios
    </div>
    <div class="reservs-container">
      <div class="reserv" v-for="(reserv, index) in reserv_array" :key="index">
        <div class="index-reserv">
          {{index + 1}}
        </div>
        <div class="nome-remedio">
          {{reserv.inserted ? `Remédio: ${reserv.remedio_nome}` : 'Vazio'}}
        </div>
        <div class="comprimidos">
          {{reserv.qtd ? `${reserv.qtd} comprimidos` : 'Vazio'}}
        </div>
        <nuxt-link :to="`/responsavel/recarga/?q=${JSON.stringify(reserv)}`" class="recarga" v-if="reserv.remedio_nome">
          Solicitar recarga
        </nuxt-link>
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
    return {
      reserv_array: [{}, {}, {}, {}, {}],
      id: '',
      isSelected: false,
      qtd: 0
    }
  },
  beforeMount() {
    if (this.dropill == null) return

    this.id = this.dropill.paciente_id

    this.dropill.forEach(d => {
      this.reserv_array[d.dropill_reserv - 1] = d
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/index.scss';

.card-container {
  padding: 1rem;
  border-radius: .5rem;
  border: 1px black solid;
  // width: 20rem;
}

.reservs-container {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.reserv {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 5fr 3fr 3fr;
}

.index-reserv, .comprimidos, .recarga {
  background-color: $color-primary;
  color: white;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.qtd {
  margin: 1rem 0;
}

.nome-remedio {
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-gray;
}

.recarga {
  margin-left: 1rem;
  border-radius: 2rem;
  background-color: $color-terciary-blue;
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