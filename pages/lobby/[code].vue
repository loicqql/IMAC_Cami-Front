<template>
  <div class="lobby">
    <enterUsername v-if="!username" @submitUsername="(name) => username = name" />
    <quizLobby v-else :code="route.params.code" :username="username" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const route = useRoute();
const username = ref();

</script>

<style lang="scss" scoped>
.lobby {
  @include d-flex-center;
  width: 100vw;
  height: 100vh;
  background-color: $gray;
}
</style>
