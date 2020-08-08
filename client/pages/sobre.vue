<template>
  <div class="container">
    <Header />
    <div class="page-content">
      <h1 class="title-container">
        Sobre a DroPill
      </h1>
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
  width: 25vw;
  margin-top: 2rem;
  padding: 1rem;
  // text-align: center;
}



</style>
