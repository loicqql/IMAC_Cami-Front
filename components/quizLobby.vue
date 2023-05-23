
<template>
  <div class="lobby">

    <div class="lobby__players">
      <div class="lobby__wrapper">
        <div :class="['lobby__player', ready ? 'lobby__player--ready' : '']">
          <div>
            <userAvatar />
            <p>{{ username }}</p>
          </div>
          <icon :class="['lobby__icon', ready ? 'lobby__icon--ready' : '']" name="done" />
          <!-- <p>{{ ready }}</p> -->
        </div>
        <div :class="['lobby__player', player.ready ? 'lobby__player--ready' : '']" v-for="player in players"
          :key="player.id">
          <div>
            <userAvatar :img="parseInt(player.user.avatarId)" />
            <p>{{ player.user.name }}</p>
          </div>
          <icon :class="['lobby__icon', player.ready ? 'lobby__icon--ready' : '']" name="done" />
          <!-- <p>{{ player.ready }}</p> -->
        </div>
      </div>
      <buttonSubmit class="lobby__button" label="Ready" :icon="{ name: 'play_arrow', theme: 'outlined' }"
        @click="handleReady" :disabled="Number.isInteger(countdown) ? true : false" />

      <div class="lobby__countdown" v-if="countdown">
        {{ countdown }}
      </div>
    </div>

  </div>

  <!-- TO DO disable button ready when everyone is ready -->
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
  display: flex;
  background-color: $gray;
  height: 100vh;

  &__players {
    position: relative;
    padding: 20px;
    width: calc(100% - 14px);
    height: calc(100% - 20px);
    background-color: #fff;
    border-radius: 10px;
    margin: 10px 7px;
    @include d-flex-center;
    flex-flow: column nowrap;
  }

  &__wrapper {
    width: 100%;
    @include d-flex-center;
    flex-flow: row wrap;
    overflow-y: scroll;
    height: 500px;
    margin-bottom: 60px;
  }

  &__player {
    position: relative;
    margin: 10px;
    padding: 20px;
    aspect-ratio: 1;
    min-width: 172px;
    border: 2px solid $y-secondary;
    transition: 0.3s ease-in-out;
    border-radius: 10px;
    @include d-flex-center;
    justify-content: space-around;

    &>div {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      p {
        margin-top: 10px;
        @include font-size(18);
        font-weight: $semi-bold-font-weight;
      }
    }

    &--ready {
      background-color: $y-secondary;
    }
  }

  &__button {
    width: 300px;
  }

  &__icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    opacity: 0;
    transition: 0.3s ease-in-out;

    &--ready {
      opacity: 1;
    }
  }

  &__countdown {
    background-color: rgba($color: #fff, $alpha: 0.5);
    @include d-flex-center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    @include font-size(100);
    opacity: 0.9;
    font-weight: $bold-font-weight;
    color: $y-primary;
  }
}
</style>
