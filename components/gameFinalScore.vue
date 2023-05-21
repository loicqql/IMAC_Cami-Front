<template>
  <div class="game-final-score">
    <div v-if="sortPlayers[2]" class="game-final-score__column">
      <userAvatar :img="parseInt(sortPlayers[2].user.avatarId)" />
      <p>{{ sortPlayers[2].score }}</p>
      <div class="game-final-score__shape">
        <p>{{ sortPlayers[2].user.name }}</p>
      </div>
    </div>
    <div v-if="sortPlayers[0]" class="game-final-score__column">
      <userAvatar :img="parseInt(sortPlayers[0].user.avatarId)" />
      <p>{{ sortPlayers[0].score }}</p>
      <div class="game-final-score__shape">
        <p>{{ sortPlayers[0].user.name }}</p>
      </div>
    </div>
    <div v-if="sortPlayers[1]" class="game-final-score__column">
      <userAvatar :img="parseInt(sortPlayers[1].user.avatarId)" />
      <p>{{ sortPlayers[1].score }}</p>
      <div class="game-final-score__shape">
        <p>{{ sortPlayers[1].user.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// IF PLAYERS < 3

import { computed } from 'vue';

const props = defineProps({
  players: {
    type: Array,
    required: true,
  }
});

const sortPlayers = computed(() => {
  return props.players.sort((a, b) => {
    return a.score < b.score ? 1 : -1;
  })
})

</script>

<style lang="scss" scoped>
.game-final-score {
  padding: 20px 30px;
  display: flex;
  justify-content: space-around;
  flex-flow: row nowrap;
  max-width: 1200px;
  width: 100%;
  overflow: hidden;

  &__column {
    @include d-flex-center;
    flex-flow: column nowrap;
    width: 25%;

    &>p {
      margin-top: 13px;
      @include font-size(25);
      font-weight: $semi-bold-font-weight;
    }

    &:nth-of-type(1) {
      transform: translateY(100%);

      .game-final-score__shape {
        background-color: #1dd1a1;
      }
    }

    &:nth-of-type(2) {
      transform: translateY(100%);

      .game-final-score__shape {

        background-color: #ff6b6b;
      }
    }

    &:nth-of-type(3) {
      transform: translateY(100%);

      .game-final-score__shape {
        background-color: #54a0ff;
      }
    }
  }

  &__shape {
    margin-top: 45px;
    background-color: rgb(255, 0, 106);
    padding: 30px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 800px;
    border-radius: 10px 10px 0 0;

    p {
      color: #fff;
      @include font-size(30);
      font-weight: $semi-bold-font-weight;
      margin-bottom: 20px;
    }
  }

  &.reveal {

    animation: 0.15s horizontal-shaking-1;
    animation-iteration-count: 17;

    .game-final-score__column {

      &:nth-of-type(1) {
        transform: translateY(200px);
        transition: 1s ease-out 0s;
      }

      &:nth-of-type(2) {
        transform: translateY(0px);
        transition: 1.6s ease-out 1s;
      }

      &:nth-of-type(3) {
        transform: translateY(100px);
        transition: 1.2s ease-out 0.5s;
      }
    }
  }
}

@keyframes horizontal-shaking-1 {
  0% {
    transform: translateX(0)
  }

  25% {
    transform: translateX(2px)
  }

  50% {
    transform: translateX(-2px)
  }

  75% {
    transform: translateX(2px)
  }

  100% {
    transform: translateX(0)
  }
}

@keyframes horizontal-shaking-2 {
  0% {
    transform: translateX(0)
  }

  25% {
    transform: translateX(7px)
  }

  50% {
    transform: translateX(-7px)
  }

  75% {
    transform: translateX(7px)
  }

  100% {
    transform: translateX(0)
  }
}

@keyframes horizontal-shaking-3 {
  0% {
    transform: translateX(0)
  }

  25% {
    transform: translateX(4px)
  }

  50% {
    transform: translateX(-4px)
  }

  75% {
    transform: translateX(4px)
  }

  100% {
    transform: translateX(0)
  }
}
</style>
