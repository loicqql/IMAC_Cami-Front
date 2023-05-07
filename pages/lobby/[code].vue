<template>
  <div class="play">
    <p>{{ $route.params.code }}</p>

    <inputLink to="/ui" text="back" />

    <div v-if="!players" class="lobby">
      <enterUsername @submitUsername="(username) => submitUsername(username)" />
    </div>
    <div v-else class="lobby">
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

    <!-- TO DO disable button ready when everyone is ready -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();

const username = ref();
const id = ref();
const ready = ref(false);

const players = ref();

async function submitUsername(_username) {
  username.value = _username;
  const socket = useSocket();
  let res = await socket.emitP('join', { code: route.params.code, username: _username, avatarId: localStorage.getItem('imgUser') });
  if (res.players) {
    res.players = filterPlayers(res.players, res.idUser);
    players.value = res.players;
    id.value = res.idUser;
  } else {
    navigateTo('/');
  }
};

async function handleReady() {
  //if button !disable
  ready.value = !ready.value;
  const socket = useSocket();
  await socket.emitP('ready', { code: route.params.code, idUser: id.value, value: ready.value });

}

function filterPlayers(players, idUser) {
  return players.filter(player => player.id == idUser ? false : true);
}

onMounted(() => {

  const socket = useSocket();
  socket.on('updateLobby', (_players) => {
    if (_players) {
      _players = filterPlayers(_players, id.value);
      players.value = _players;
    }
  });
})

</script>

<style lang="scss" scoped>
.ui {
  padding: 50px;
  width: 100%;
}

.lobby {
  margin: 100px;
}
</style>
