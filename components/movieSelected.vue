<template>
  <div class="movie-selected">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.movie-selected {
  height: 100%;
  background-color: #000;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-top: 75px;
}

</style>
