<template>
  <div class="leaderboard">

    <gameFinalScore v-if="players" :class="revealScore ? 'reveal' : ''" :players="players" />

    <p v-else>En attente de résultats</p>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const route = useRoute();

const players = ref(null);
const revealScore = ref(false);

onMounted(() => {
  const socket = useSocket();
  socket.emit('joinRoom', route.params.code);
  if (localStorage.getItem(route.params.code) == 'host') {
    setTimeout(() => {
      socket.emit('sendFinalScore', { code: route.params.code });
    }, 1000);
  }

  socket.on('finalScore', (data) => {
    players.value = data;
    setTimeout(() => {
      revealScore.value = true;
    }, 1000);
  });



})

</script>

<style lang="scss" scoped>
.leaderboard {}
</style>
