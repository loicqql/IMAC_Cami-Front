<template>
  <div class="quiz-answer">
    <div :class="['quiz-answer__img', answer ? 'quiz-answer__img--answer' : '']">
      <p>{{ answer }}</p>
      <img :src="backdrop" />
    </div>
    <quizSearch @answer="id => emit('answer', id)" />
  </div>
</template>

<script setup>

const props = defineProps({
  backdrop: {
    type: String,
  },
  answer: {
    type: String,
    default: null
  }
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
    margin-bottom: 30px;
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
</style>
