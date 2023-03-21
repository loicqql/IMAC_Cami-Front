<template>
  <div :class="['movie-card', isSelected ? 'selected' : '']" :style="styleMovieCard">
    <img :src="imageSrc" :alt=" title + ' poster'">
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const runtimeConfig = useRuntimeConfig()

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 185
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  });

  const imageSrc = computed(() => {
    if(props.src) {
      return  runtimeConfig.base_url_img + '/w' + props.width + props.src;
    }
  })

  const styleMovieCard = computed(() => {
    return {
      width: props.width + 'px',
      height: props.width * 1.502 + 'px' // 1.502 = ratio poster
    }
  })

</script>

<style lang="scss" scoped>
.movie-card {

  @include d-flex-center;
  overflow: hidden;
  cursor: pointer;

  img {
    height: 100%;
  }

  &.selected {
    padding: 15px;
    background-color: #5c5c5c;
    border-radius: 10px;
    margin: 20px;
    img {
      transition: 0.2s;
      border-radius: 10px;
    }
    &:hover {
      img {
        opacity: 0.6;
      }
    }
  }
}

</style>
