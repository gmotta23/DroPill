<template>
  <div class="container">
    <Single v-for="(dropill, index) in dropills" :key="index" :dropill="dropill" />
  </div>
</template>

<script>

import Single from './MedicoSingle.vue'

export default {
  components: {
    Single
  },
  props: {
    dropills: {required: true}
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