<template>
  <div class="play">

    <div :class="['play__game', players ? 'play__game--gameboard-visible' : '']">

      <div class="play__wrapper">
        <div :class="['play__loading', question ? '' : 'play__loading--visible']">
          <p>Question Todo</p>
        </div>

        <quizAnswer :backdrop="question?.value" @answer="id => handleSubmit(id)" :answer="answer" />

        <!-- <p :class="answer ? '' : 'invisible'"> {{ answer ? answer : ' ' }}</p> -->
        <buttonSubmit :class="host && answer ? '' : 'invisible'" label="Next" @click="nextQuestion"
          :disabled="!(host && answer)" />
      </div>

      <!-- to do loading de 30 sec -->
      <!-- en attente de l'hôte -->


    </div>
    <div :class="['play__gameboard', players ? 'play__gameboard--visible' : '']">
      <gameLeaderBoard v-if="players" :players="players" />
    </div>
    <p v-if="notification" class="notification"> {{ notification }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const route = useRoute();

const question = ref();
const answer = ref();
const questionNumber = ref(0);
const notification = ref();
const players = ref();

const time = ref(10000);  // prod : 30000

// const players = ref([
//   {
//     user: { name: 'Paul', img: 5 },
//     score: 758
//   },
//   {
//     user: { name: 'Joe', img: 8 },
//     score: 500
//   },
//   {
//     user: { name: 'Ben', img: 2 },
//     score: 1000
//   }
// ]);

const timeoutEndQuestion = ref();

const host = ref(false);

// host
function startQuestion(_questionNumber) {
  question.value = null;
  answer.value = null;
  const socket = useSocket();
  socket.emit('clear', { code: route.params.code })
  setTimeout(() => socket.emit('startQuestion', { code: route.params.code, questionNumber: _questionNumber }), 2000);
  timeoutEndQuestion.value = setTimeout(() => {
    socket.emit('endQuestion', { code: route.params.code, questionNumber: _questionNumber });
  }, time.value);
}

// host
function nextQuestion() {
  startQuestion(questionNumber.value + 1);
}

async function handleSubmit(id) {
  const socket = useSocket();
  let res = await socket.emitP('answerQuestion', { code: route.params.code, questionNumber: questionNumber.value, answer: id, idUser: localStorage.getItem('idUser') });
  console.log(res); // true or false;
}

onMounted(() => {
  const socket = useSocket();
  socket.emit('joinRoom', route.params.code);
  if (localStorage.getItem(route.params.code) == 'host') {
    host.value = true;
    startQuestion(0);
  }

  socket.on('question', (data) => {
    question.value = data.question;
    questionNumber.value = data.questionNumber;
  });

  socket.on('notification', (data) => {
    notification.value = data;
  });

  socket.on('updateScore', (data) => {
    players.value = data; // to do : diff w/ old value
  });

  socket.on('answer', (data) => {
    clearTimeout(timeoutEndQuestion.value);
    answer.value = data;
  });
  socket.on('clear', () => {
    question.value = null;
    answer.value = null;
  });
})
</script>

<style lang="scss" scoped>
.play {
  display: flex;
  background-color: $gray;
  height: 100vh;

  &__game {
    padding: 20px;
    width: calc(100% - 14px);
    height: calc(100% - 20px);
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 7px;
    @include d-flex-center;
    flex-flow: column nowrap;
    transition: 0.3s ease-in-out;

    &--gameboard-visible {
      width: calc(75% - 14px);
    }
  }

  &__gameboard {
    width: 0px;
    height: calc(100% - 20px);
    background-color: #fff;
    border-radius: 10px;
    margin: 0;
    transition: 0.3s ease-in-out;

    &--visible {
      width: calc(25% - 14px);
      margin: 10px 7px;
    }
  }

  &__wrapper {
    position: relative;
    overflow: hidden;
  }

  &__loading {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #fff;
    @include d-flex-center;
    transition: 0.4s ease-in-out;
    transform: translateY(-100%);

    &--visible {
      transform: translateY(0);
    }
  }

  .invisible {
    transition: 0.01s ease-in-out 0.4s;
  }

  .notification {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>
