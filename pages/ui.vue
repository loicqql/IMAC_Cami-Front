<template>
  <div class="ui">
    <inputRange v-model:val="valR" :min="1" :max="9" />
    {{ valR }}
    <inputSelect v-model:val="valS" />
    {{ valS }}

    <inputCheckbox v-model:val="valC" name="check" />
    {{ valC }}

    <avatar />
  </div>

</template>

<script setup>
  import { ref } from 'vue';

  const valR = ref(4);
  const valS = ref('');
  const valC = ref(false);

</script>

<style lang="scss" scoped>
  .ui {
    padding: 50px;
    width: 500px;
  }
</style>
