<template>
  <div class="game-params">
    <div class="game-params__wrapper">
      <div class="game-params__create">
        <h1>Créer un quiz</h1>
        <div>
          <h2>Nombre de questions</h2>
          <inputRange class="game-params__input-range" v-model:val="nbQuestions" :min="1" :max="15" />
          <h2>Genres</h2>
          <inputGenres class="game-params__input-genres" @filterGenres="(e) => filterGenres = e" />
          <div class="game-params__submit">
            <loader :class="['game-params__loader', launched ? '' : 'invisible']" />
            <buttonSubmit label="Lancer" :icon="{ name: 'play_arrow', theme: 'outlined' }" @click="create" />
          </div>
        </div>
      </div>
    </div>
    <div class="game-params__join">
      <enterCode />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nbQuestions = ref(6);
const launched = ref(false);
const filterGenres = ref([]);

async function create() {
  const socket = useSocket();
  launched.value = true;
  let code = await socket.emitP('create', { nbQuestions: nbQuestions.value, filterGenres: filterGenres.value });
  localStorage.setItem(code, 'host');
  navigateTo(`/lobby/${code}`);
}

</script>

<style lang="scss" scoped>
.game-params {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  @include d-flex-center;
  flex-flow: column wrap;
  overflow: hidden;

  &__wrapper {
    width: 100%;
    height: 100%;
  }

  &__create {
    width: 100%;
    height: 100%;
    padding: 20px;

    &>div {
      padding: 0 20px;
    }

    h1 {
      @include font-size(25);
      font-weight: $semi-bold-font-weight;
      margin-bottom: 30px;
    }

    h2 {
      font-weight: $medium-font-weight;
      margin-bottom: 10px;
    }
  }

  &__input-range {
    margin-top: 30px;
  }

  &__input-genres {
    margin-bottom: 10px;
  }

  &__submit {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;

    div {
      margin-left: 15px;
    }
  }

  &__join {
    width: 100%;
    height: 100%;
    border-left: 2px solid $y-secondary;

    &>div {
      width: 100%;
      height: 100%;
    }
  }
}

@media (min-width: 800px) {
  .game-params {
    flex-flow: row nowrap;

    &__wrapper {
      width: 67%;
    }

    &__create {
      padding: 40px 50px;
    }

    &__join {
      width: 33%;
    }
  }
}
</style>
