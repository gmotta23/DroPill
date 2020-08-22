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
    <div class="gerar-dropill">
      <div class="button">
        Gerar DroPill!
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    receita: {required: true}
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

.gerar-dropill {
  .button {
    @include mixin-button;
  }
}

</style>