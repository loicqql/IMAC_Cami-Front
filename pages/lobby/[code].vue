<template>
  <div class="lobby">
    <p>{{ $route.params.code }}</p>

    <inputLink to="/ui" text="back" />

    <div v-if="!username" class="lobby">
      <enterUsername @submitUsername="(name) => username = name" />
    </div>
    <div v-else class="lobby">
      <quizLobby :code="route.params.code" :username="username" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const route = useRoute();
const username = ref();

</script>

<style lang="scss" scoped>
.ui {
  padding: 50px;
  width: 100%;
}

.lobby {
  margin: 100px;
}
</style>
