<template>
  <div class="avatar">
    <img v-if="avatar" :src="avatar">
    <p v-else>Loading</p>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";

const avatar = ref(false);

onMounted(() => {
  let img = 1;
  avatar.value = `/avatars/${img}.png`;
});

</script>

<style lang="scss" scoped>

.avatar {
  width: 100px;
  height: 100px;
  @include d-flex-center;
  border-radius: 100%;
  overflow: hidden;

  img {
    width: 100%;
  }
}

</style>
