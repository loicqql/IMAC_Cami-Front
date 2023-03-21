<template>
  <div class="index">
    <section class="index__search">
      <inputSearch v-model:val="val" />
      <div class="index__container">
        <div v-for="(res, index) in results" :key="index">
          <movieCard v-if="res.poster_path" :src="res.poster_path" :title="res.title" @click="handleClickCard(res.id, res.poster_path, res.title)" />
        </div>
      </div>
    </section>
    <section class="index__selected">
      <movieSelected>
        <movieCard v-for="(movie, index) in selectedMovies" :key="index" :src="movie.poster_path" :title="movie.title" isSelected @click="deleteMovie(movie.id)" />
      </movieSelected>
    </section>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';

  const val = ref('');
  const results = ref([]);
  const selectedMovies = ref([]);

  const getBackendMovies = async () => {return await $fetch('/api/backend/movies')};

  function handleClickCard(id, poster_path, title) {
    if(!selectedMovies.value.some(e => e.id == id))
      selectedMovies.value.push({id, poster_path, title});
  };

  function deleteMovie(id) {
    selectedMovies.value = selectedMovies.value.filter(movie => movie.id != id);
  };

  watch(val, async () => {
    if(val.value != '') {
      results.value = await $fetch('/api/tmdb/search/movie', {params : {query : val.value}})
    }else {
      results.value = await getBackendMovies();
    }
  });

  onMounted(async () => {
    results.value = await getBackendMovies();
  })

</script>

<style lang="scss" scoped>
.index {
  display: flex;
  min-height: 100vh;

  &__search {
    width: 70%;
  }

  &__selected {
    width: 30%;
  }

  &__container {
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
