<template>
  <div class="enter-code">
    <div class="enter-code__container">
      <userAvatar />
      <p class="enter-code__text">Entrez un pseudo</p>
      <inputText type="text" name="username" label="Pseudo" required v-model:val="username" />
      <buttonSubmit class="enter-code__button" label="Valider" :icon="{ name: 'play_arrow', theme: 'outlined' }"
        @click="handleSubmit" />
      <p class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const username = ref('');
const error = ref('');

const emit = defineEmits(['submitUsername']);

async function handleSubmit() {
  if (username.value) {
    error.value = "";
    setUsernameLocalStorage();
    emit('submitUsername', username.value);
  } else {
    error.value = "Pseudo non valide"
  }
}

function setUsernameLocalStorage() {
  if (process.client) {
    localStorage.setItem('nameUser', username.value);
  }
}

onMounted(() => {
  if (process.client) {
    let usernameLocal = localStorage.getItem('nameUser');
    if (usernameLocal) {
      username.value = usernameLocal;
    }
  }
})
</script>
<style lang="scss" scoped>
.enter-code {
  width: 275px;
  background-color: #fff;
  border-radius: 10px;

  &__container {
    padding: 10px 25px;
    @include d-flex-center;
    flex-flow: column nowrap
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
    margin-top: 15px;
    width: 100%;
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
