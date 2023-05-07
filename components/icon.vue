<template>
  <i :class="iconClasses">
    {{ name }}
  </i>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "home",
  },
  theme: {
    type: String,
  },
})

const iconClasses = computed(() => {
  if (props.theme) {
    return ['material-symbols-' + props.theme]
  }
  return ['material-symbols-outlined'];
})

</script>
