<template>
  <div class="play">
    <p>{{ $route.params.code }}</p>

    <inputLink to="/ui" text="back" />

  </div>

</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const quiz = ref();

  const route = useRoute();

  onMounted(async () => {
    const ctx = useNuxtApp();
    const socket = ctx.$nuxtSocket({persist: 'main'});
    let aquiz = await socket.emitP('join', route.params.code);
    if(aquiz) {
      quiz.value = aquiz;
    }else {
      //redirection
    }
  })

</script>

<style lang="scss" scoped>
  .ui {
    padding: 50px;
    width: 100%;
  }
</style>
