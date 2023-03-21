<template>
  <div>
    <div v-if="pending">
      Loading ...
    </div>
    <div class="container-full" v-else>
      <div class="movie" v-for="(movie, index) in movies" :key="index">
        <img :src="'https://image.tmdb.org/t/p/w300/'+movie.poster_path">
      </div>
    </div>
  </div>
</template>

<script setup>

  const { pending, data: movies } = useLazyFetch('/api/discover/movie');

</script>

<style lang="scss" scoped>
.container-full {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  .movie {
  }
}
</style>
