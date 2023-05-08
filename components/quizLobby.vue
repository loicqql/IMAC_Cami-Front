
<template>
  <div class="play">

    <div class="lobby">
      <div>
        <userAvatar />
        {{ username }}
        {{ ready }}
      </div>
      <div v-for="player in players" :key="player.id">
        <!-- {{ player.user.name }} avatar -->
        <userAvatar :img="parseInt(player.user.avatarId)" />
        {{ player.user.name }}
        {{ player.ready }}
      </div>

      <buttonSubmit label="Ready" :icon="{ name: 'play_arrow', theme: 'outlined' }" @click="handleReady" />

    </div>

    {{ countdown }}

    <!-- TO DO disable button ready when everyone is ready -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const id = ref();
const ready = ref(false);

const players = ref();
const countdown = ref(null);

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
})

async function handleReady() {
  //if button !disable
  ready.value = !ready.value;
  const socket = useSocket();
  await socket.emitP('ready', { code: props.code, idUser: id.value, value: ready.value });

}

function filterPlayers(players, idUser) {
  return players.filter(player => player.id == idUser ? false : true);
}

onMounted(async () => {
  let host = localStorage.getItem(props.code) == 'host' ? true : false;
  const socket = useSocket();
  let res = await socket.emitP('join', { code: props.code, username: props.username, avatarId: localStorage.getItem('imgUser'), host: host });
  if (res.players) {
    res.players = filterPlayers(res.players, res.idUser);
    players.value = res.players;
    id.value = res.idUser;
    localStorage.setItem('idUser', res.idUser);
  } else {
    navigateTo('/');
  }

  socket.on('updateLobby', (_players) => {
    if (_players) {
      _players = filterPlayers(_players, id.value);
      players.value = _players;
    }
  });

  socket.on('startQuiz', (_countdown) => {
    if (_countdown <= 0) {
      navigateTo(`/play/${props.code}`);
      return;
    }
    countdown.value = _countdown;
  });
})

</script>

<style lang="scss" scoped>
.lobby {
  margin: 100px;
}
</style>
