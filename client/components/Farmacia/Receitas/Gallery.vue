<template>
  <div class="container">
    <Single v-for="(receita, index) in receitas" :key="index" :receita="receita" />
  </div>
</template>

<script>

import Single from './Single.vue'

export default {
  components: {
    Single
  },
  props: {
    receitas: {required: true}
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  justify-content: center;
}
</style>