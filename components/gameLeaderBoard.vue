<template>
  <div class="game-leader-board">
    <userScore class="game-leader-board__user" v-for="(player, index) in sortPlayers" :key="index" :user="player.user" :user-score="player.score"/>
  </div>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
  players: {
    type: Array,
    required: true,
  }
});

const sortPlayers = computed(() => {
  return props.players.sort((a, b) => {
    return a.score < b.score;
  })
})

</script>

<style lang="scss" scoped>

.game-leader-board {
  padding: 20px 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  &__user {
    width: 100%;
    margin: 10px 0;
  }
}

</style>
