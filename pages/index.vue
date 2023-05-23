<template>
  <div class="index">
    <div class="index__gameparams">
      <gameParams />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  width: 100vw;
  height: 100vh;
  background-image: url('background.png');
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
  }

  &__gameparams {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
  }
}
</style>
