<template>
  <div class="play">
    <h1>Play</h1>

    <div v-if="question" class="question">
      {{ question.name }}
      <buttonSubmit label="Valider" @click="handleSubmit" />
    </div>
    <div v-else>
      Loading : Question {{ questionNumber + 1 }} <!-- pas de score au loading de la question 0 -->
    </div>

    <p v-if="answer"> {{ answer }}</p>
    <p v-if="notification"> {{ notification }}</p>

    <!-- to do loading de 30 sec -->

    <buttonSubmit v-if="host" label="Next" @click="nextQuestion" />

    <gameLeaderBoard v-if="players" :players="players" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const route = useRoute();

const question = ref();
const value = ref();
const answer = ref();
const questionNumber = ref(0);
const notification = ref();
const players = ref();

const timeoutEndQuestion = ref();

const host = ref(false);

// host
function startQuestion(_questionNumber) {
  const socket = useSocket();
  socket.emit('startQuestion', { code: route.params.code, questionNumber: _questionNumber });
  timeoutEndQuestion.value = setTimeout(() => {
    socket.emit('endQuestion', { code: route.params.code, questionNumber: _questionNumber });
  }, 5000); // dev : 5000 / prod : 30000
}

// host
function nextQuestion() {
  startQuestion(questionNumber.value + 1);
}

async function handleSubmit() {
  const socket = useSocket();
  let res = await socket.emitP('answerQuestion', { code: route.params.code, questionNumber: questionNumber.value, answer: value.value, idUser: localStorage.getItem('idUser') });
  console.log(res); // true or false;
}

onMounted(() => {
  const socket = useSocket();
  socket.emit('joinRoom', route.params.code);
  if (localStorage.getItem(route.params.code) == 'host') {
    host.value = true;
    setTimeout(() => {
      startQuestion(0);
    }, 1000);
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
})
</script>

<style lang="scss" scoped></style>
