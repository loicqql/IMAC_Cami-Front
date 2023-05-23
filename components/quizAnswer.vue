<template>
  <div class="quiz-answer">
    <div :class="['quiz-answer__img', answer ? 'quiz-answer__img--answer' : '']">
      <p>{{ answer }}</p>
      <img v-if="backdrop" :src="`https://image.tmdb.org/t/p/w1280${backdrop}`" />
    </div>
    <div :class="['quiz-answer__timer', !(disabled || answer) ? 'quiz-answer__timer--active' : '']"></div>
    <quizSearch :class="[shake ? 'shake' : '']" ref="quizSearchRef" @answer="id => emit('answer', id)"
      :disabled="disabled || answer ? true : false" />
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';


const quizSearchRef = ref(null);
const shake = ref(false);
const disabled = ref(true);

const props = defineProps({
  backdrop: {
    type: String,
  },
  answer: {
    type: String,
    default: null
  }
});

function cleanInput() {
  quizSearchRef.value.clean();
}

function shakeInput() {
  shake.value = true;
  setTimeout(() => {
    shake.value = false;
  }, 500);
}

function disableInput() {
  disabled.value = true;
}

function activateInput() {
  disabled.value = false;
}

defineExpose({
  cleanInput,
  shakeInput,
  disableInput,
  activateInput
});

const emit = defineEmits(['answer']);

</script>

<style lang="scss" scoped>
.quiz-answer {
  width: 600px;
  @include d-flex-center;
  flex-flow: column nowrap;

  &__img {
    width: 100%;
    border-radius: 7px;
    margin-bottom: 20px;
    aspect-ratio: 16 / 9;
    position: relative;
    background-color: black;

    p {
      color: #fff;
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, 0%);
      @include font-size(26);
      width: 70%;
      font-weight: $semi-bold-font-weight;
      transition: 0.2s ease-in-out;
    }

    img {
      width: 100%;
      border-radius: 7px;
      opacity: 1;
      transition: 0.3s ease-in-out;
    }
  }

  &__timer {
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    border: 2px solid $y-primary;
    position: relative;
    height: 30px;
    overflow: hidden;
    opacity: 0;

    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: $y-primary;
    }

    &--active {
      opacity: 1;

      &::after {
        transition: 30s linear 1s;
        width: 100%;
      }
    }
  }
}

.quiz-answer__img--answer {
  background-color: black;

  p {
    transform: translate(-50%, -50%);
  }

  img {
    opacity: 0.8;
  }
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }

  10% {
    transform: translate(-1px, -2px);
  }

  20% {
    transform: translate(-3px, 0px);
  }

  30% {
    transform: translate(3px, 2px);
  }

  40% {
    transform: translate(1px, -1px);
  }

  50% {
    transform: translate(-1px, 2px);
  }

  60% {
    transform: translate(-3px, 1px);
  }

  70% {
    transform: translate(3px, 1px);
  }

  80% {
    transform: translate(-1px, -1px);
  }

  90% {
    transform: translate(1px, 2px);
  }

  100% {
    transform: translate(1px, -2px);
  }
}
</style>
