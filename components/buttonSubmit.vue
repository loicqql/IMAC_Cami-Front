<template>
  <div class="button" @click="handleClick">
    <div class="button__container" :style="padding">
      <span v-if="label" class="button__text">{{ label }}</span>
      <icon v-if="icon" class="button__icon" :name="icon.name" :theme="icon.theme" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  icon: {
    type: Object,
    required: false
  }
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click');
}

const padding = computed(() => {
  return {
    padding: props.icon ? "0 1rem" : "0 1.5rem"
  };
})

</script>

<style scoped lang="scss">
.button {
  transition: 0.2s;
  font-weight: $semi-bold-font-weight;
  overflow: hidden;
  cursor: pointer;

  &__container {
    background-color: $y-primary;
    height: 47px;
    padding: 0 1.5rem;
    @include d-flex-center;
    transition: 0.15s;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 7px 0px 0px $y-secondary-3;

    &:active {
      transform: translateY(7px);
      box-shadow: none;
    }
  }

  &__text,
  &__icon {
    color: $text;
    transition: 0.15s;
    user-select: none;
  }

  &__text {
    @include font-size(20);
    font-style: italic;
    font-weight: $bold-font-weight;
  }

  &__icon {
    @include font-size(25);
    padding-left: 0.2rem;
  }

  &.disabled {
    opacity: 0.5;
  }
}
</style>
