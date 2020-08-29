<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Bem vindo médico!
      </h1>
      <div class="control-panel">
        <nuxt-link to="/medico/receita" class="button">
          Gerar nova receita
        </nuxt-link>
        <nuxt-link to="/medico/dropill" class="button">
          Ver DroPills
        </nuxt-link>
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

    }
  },
  components: {
    Header
  },
  methods: {

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
  width: auto;
  margin-top: 2rem;
  padding: 1rem;
}

.button {
  @include mixin-button;
}

.control-panel {
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  width: 40rem;
  justify-content: space-between;
}

</style>
