<template>
  <div class="input-select">
    <select :value="val" @input="handleInput($event.target.value)" :class="val === '' ? 'empty': ''">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
</template>

<script setup>

  const props = defineProps({
    val: {
      type: [String],
      required: false,
    }
  });

  const emit = defineEmits(['update:val']);

  function handleInput(event) {
    emit('update:val', event);
  }

</script>

<style lang="scss" scoped>
.input-select {
  position: relative;

  &:after {
    content: "<>";
    font: 14px "Consolas";
    color: $y-primary;
    transform: rotate(90deg) translateX(-50%);
    right: 8px;
    top: 50%;
    padding: 0 0 4px;
    border-bottom: 1px solid $y-secondary-2;
    position: absolute;
    pointer-events: none;
  }

  select {
    width: 100%;
    outline: none;
    box-shadow: none;
    border: none;
    padding: 20px 30px;
    background-color: $y-secondary;
    font-weight: $semi-bold-font-weight;
    appearance: none;
    cursor: pointer;
    border-radius: 7px;
    overflow: hidden;

    &.empty {
      color: $gray-input;
    }

    option {
      outline: none;
      box-shadow: none;
      border: none;
      padding: 7px 10px;
      background-color: $y-secondary;
      cursor: pointer;
    }
  }

}
</style>
