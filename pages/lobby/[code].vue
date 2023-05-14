<template>
  <enterUsername v-if="!username" @submitUsername="(name) => username = name" />
  <quizLobby v-else :code="route.params.code" :username="username" />
</template>

<script setup>
import { ref } from 'vue';

const route = useRoute();
const username = ref();

</script>
