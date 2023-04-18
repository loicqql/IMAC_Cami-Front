<template>
  <NuxtLink v-if="!native" class="link" :to="to">
    {{ text }}
  </NuxtLink>
  <a v-else class="link" :href="to" :target="blank ? '_blank' : ''">
    {{ text }}
  </a>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  blank: {
    type: Boolean,
    default: false
  },
  native: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.link {
  color: $r-primary;
  border-bottom: 2px solid $r-primary;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: $r-secondary;
    width: 0;
    height: 100%;
    transition: 0.2s ease-in-out;
    z-index: -1;
  }
  &:hover::before {
    width: 100%;
  }
}
</style>
