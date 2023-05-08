<template>
  <div class="input-text">
    <label class="input-text__label" :for="name">{{ label }}</label>
    <div class="input-text__wrapper">
      <input class="input-text__input" type="text" :name="name" :value="val" @input="handleInput($event.target.value)"
        :required="required" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  val: {
    type: [String],
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:val']);

const digits = ref([]);

function handleInput(event) {
  emit('update:val', event);
}

</script>
<style lang="scss" scoped>
.input-text {
  width: 100%;

  &__label {
    display: block;
    font-weight: $semi-bold-font-weight;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    @include font-size(14);
  }

  &__input {
    appearance: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    font-weight: $bold-font-weight;
    height: 40px;
    background-color: transparent;
    text-align: center;
    border-radius: 5px;
    -moz-appearance: textfield;
    border: none;

    &:focus {
      box-shadow: 0 0 0 0.1rem $y-secondary-2;
    }
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    border: solid 1px $y-secondary-2;
    border-radius: 5px;
    background-color: $y-secondary;
    transition: 0.2s;

    &:focus {
      box-shadow: 0 0 0 0.2rem $y-secondary-2;
    }
  }
}

.invalid.input-text__wrapper {
  border: solid 1px var(--error-color);
}

.invalid .input-text__input::placeholder {
  color: var(--light-error-color) !important;
}

.invalid .input-text__input:focus {
  box-shadow: 0 0 0 0.2rem var(--light-error-color);
}

.input-text__input::-webkit-inner-spin-button,
.input-text__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
