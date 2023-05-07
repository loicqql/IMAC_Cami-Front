<template>
  <div class="enter-code col-10 col-md-5 col-xl-3">
    <h2 class="enter-code__title">Jouer</h2>
    <div class="enter-code__container">
      <p class="enter-code__text">Entrez un code pour <strong>commencer le jeu.</strong></p>
      <inputCode type="text" name="code" label="Code" required v-model="code" />
      <buttonSubmit label="Jouer" :icon="{ name: 'play_arrow', theme: 'outlined' }" @click="handleSubmit" />
      <!-- <p class="enter-code__text enter-code__text--bottom">Créer son propre quiz
        <inputLink text="ici" to="/quiz/add" />
      </p> -->
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
    try {
      // await this.$axios.$get(`/api/quiz/${code.value}`);
      // this.$router.push(`/play/${code.value}`);
    } catch (err) {
      // error.value= err?.response?.data?.error;
    }
  }
}
</script>
<style lang="scss" scoped>
.enter-code {
  height: 390px;

  &__title {
    height: 70px;
    color: $text;
    background-color: $y-primary;
    @include d-flex-center;
    @include font-size(22);
    font-weight: $semi-bold-font-weight;
  }

  &__container {
    padding: 0 50px;
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

  .quiz-button {
    padding: 30px 0;
  }

  .error {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
