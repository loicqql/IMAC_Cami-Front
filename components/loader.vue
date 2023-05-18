<template>
  <div :class="['loader', white ? 'loader--white' : '']">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  white: {
    type: Boolean,
    default: false
  }
});

const sortPlayers = computed(() => {
  return props.players.sort((a, b) => {
    return a.score < b.score;
  })
})

</script>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;

  &--white {
    div {
      border: 3px solid #fff;
      border-color: #fff transparent transparent transparent;
    }
  }

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    border: 3px solid $text;
    border-radius: 50%;
    animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $text transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
