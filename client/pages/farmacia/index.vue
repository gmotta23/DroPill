<template>
  <div class="container">
    <Header />
    <div class="page-content">
      Farmácia
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}

.page-content {
  padding-top: 4rem;
}
</style>