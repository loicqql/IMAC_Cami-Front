<template>
  <div class="leaderboard">
    <div class="leaderboard__wrapper" v-if="players">
      <gameFinalScore :class="revealScore ? 'reveal' : ''" :players="players" />
      <buttonSubmit v-if="button" class="leaderboard__button" label="Home" @click="navigateTo('/')" />
    </div>
    <p v-else>En attente de résultats</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const route = useRoute();

const players = ref(null);
const revealScore = ref(false);

const button = ref(false);

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

    setTimeout(() => {
      button.value = true;
    }, 5000);
  });


})

</script>

<style lang="scss" scoped>
.leaderboard {
  @include d-flex-center;

  &__wrapper {
    @include d-flex-center;
    width: 100%;
  }

  &__button {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
