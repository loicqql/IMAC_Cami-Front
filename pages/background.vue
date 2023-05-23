<template>
  <div class="index">
    <!-- <div class="gameparams">
      <gameParams />
    </div> -->
    <div class="index__container">
      <div v-for="(res, index) in results" :key="index">
        <movieCard class="index__card" v-if="res.poster_path" :src="res.poster_path" :title="res.title"
          @click="handleClickCard(res.id, res.poster_path, res.title)" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/');
    },
  ]
});

import { ref, watch, onMounted } from 'vue';

const val = ref('');
const results = ref([]);
const selectedMovies = ref([]);

const getBackendMovies = async () => { return await $fetch('/api/backend/movies') };

function handleClickCard(id, poster_path, title) {
  if (!selectedMovies.value.some(e => e.id == id))
    selectedMovies.value.push({ id, poster_path, title });
};

function deleteMovie(id) {
  selectedMovies.value = selectedMovies.value.filter(movie => movie.id != id);
};

watch(val, async () => {
  if (val.value != '') {
    results.value = await $fetch('/api/tmdb/search/movie', { params: { query: val.value } })
  } else {
    let data = await getBackendMovies();
    results.value = data.movies
  }
});

onMounted(async () => {
  let data = await getBackendMovies();
  results.value = data.movies
})

</script>

<style lang="scss" scoped>
.index {
  position: relative;
  display: flex;
  // min-height: 100vh;
  background-color: black;
  height: 125vw;
  overflow: hidden;


  &__container {
    transform: translate(-6vw, 10vh) rotate(-25deg);
    display: flex;
    flex-flow: column wrap;
  }

  &__card {
    border-radius: 15px;
    margin: 10px;
    overflow: hidden;
  }
}

.gameparams {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
}
</style>
