<template>
  <div class="user-avatar">
    <img v-if="avatar" :src="avatar">
    <p v-else>Loading</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  img: {
    type: Number,
    required: false,
  }
});

const avatar = computed(() => {
  if (process.client) {
    if(!props.img) {
      let imgUser = localStorage.getItem('imgUser');
      if(imgUser) {
        return `/avatars/${imgUser}.png`;
      }else {
        let imgUser = (Math.floor(Math.random() * 10) + 1)
        localStorage.setItem('imgUser', imgUser);
        return `/avatars/${imgUser}.png`;
      }
    }else {
      localStorage.removeItem('imgUser');
      return `/avatars/${props.img}.png`;
    }
  }
})

</script>

<style lang="scss" scoped>

.user-avatar {
  width: 100px;
  height: 100px;
  @include d-flex-center;
  border-radius: 100%;
  overflow: hidden;
  background-color: #f2f2f2;

  img {
    width: 100%;
  }

  p {
    @include font-size(10);
  }
}

</style>
