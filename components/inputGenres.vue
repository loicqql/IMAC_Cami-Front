<template>
  <div class="input-genres">
    <div class="input-genres__bullets">
      <span :class="['input-genres__bullet', all ? 'input-genres__bullet--selected' : '']" @click="reset">All</span>
      <span :class="['input-genres__bullet', genre.selected ? 'input-genres__bullet--selected' : '']"
        v-for="(genre, index) in genres" :key="index" @click="handleClick(index)">
        {{ genre.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filterGenres']);

const all = ref(true);

const genres = ref([
  { name: "Action", id: 1, selected: false },
  { name: "Animation", id: 2, selected: false },
  { name: "Aventure", id: 3, selected: false },
  { name: "Comédie", id: 4, selected: false },
  { name: "Crime", id: 5, selected: false },
  { name: "Histoire", id: 6, selected: false },
  { name: "Guerre", id: 7, selected: false },
  { name: "Western", id: 8, selected: false },
  { name: "Horreur", id: 9, selected: false }
]);

function handleClick(index) {
  genres.value[index].selected = !genres.value[index].selected;
  if (genres.value.filter((e) => e.selected == true).length == 0) {
    all.value = true;
  } else {
    all.value = false;
  }

  push();
}

function reset() {
  all.value = true;
  genres.value.forEach(genre => {
    genre.selected = false;
  });

  push();
}

function push() {
  emit('filterGenres', genres.value.filter((e) => e.selected == true));
}


</script>

<style lang="scss" scoped>
.input-genres {
  &__bullets {
    width: 100%;
    overflow-x: scroll;
    padding: 23px 0;
  }

  &__bullet {
    user-select: none;
    cursor: pointer;
    margin: 0 5px;
    border-radius: 100px;
    border: 1px solid $y-primary;
    background-color: $y-secondary;
    padding: 7px 15px;

    &--selected {
      background-color: $y-primary;
    }
  }
}
</style>
