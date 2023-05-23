<template>
  <div class="enter-code">
    <h2 class="enter-code__title">Jouer</h2>
    <div class="enter-code__container">
      <p class="enter-code__text">Entrez un code pour <strong>commencer le jeu.</strong></p>
      <inputCode type="text" name="code" label="Code" required v-model="code" />
      <buttonSubmit class="enter-code__button" label="Jouer" :icon="{ name: 'play_arrow', theme: 'outlined' }"
        @click="handleSubmit" />
      <p class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const code = ref('');
const error = ref('');

async function handleSubmit() {
  if (code.value) {
    navigateTo(`/lobby/${code.value}`);
  }
}
</script>
<style lang="scss" scoped>
.enter-code {

  &__title {
    height: 70px;
    color: $text;
    background-color: $y-primary;
    @include d-flex-center;
    @include font-size(22);
    font-weight: $semi-bold-font-weight;
  }

  &__container {
    padding: 20px 50px;
  }

  &__text {
    @include font-size(14);
    font-weight: $regular-font-weight;
    padding-top: 20px;
    text-align: center;
    line-height: 120%;

    strong {
      font-weight: $semi-bold-font-weight;
    }

    &--bottom {
      padding-top: 0px;
      text-align: left;
      font-weight: $semi-bold-font-weight;
    }
  }

  &__button {
    padding: 35px 0;
  }
}

.error {
  margin-top: 10px;
  text-align: center;
}
</style>
