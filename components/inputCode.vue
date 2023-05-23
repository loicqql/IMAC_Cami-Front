<template>
  <div class="input-code">
    <label class="input-code__label" :for="name">{{ label }}</label>
    <div class="input-code__wrapper" @click="$event.target.firstChild.focus()">
      <input v-for="index in digitCount" :key="index" class="input-code__input" type="number" :name="name + '-' + index"
        :id="name + '-' + index" :value="digitsFromValue[index - 1]" @click.stop @input="handleInput($event, index - 1)"
        @paste.prevent="handlePaste" :required="required" :placeholder="index" inputmode="decimal" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  digitCount: {
    type: Number,
    default: 4,
  }
})

const emit = defineEmits(['update:modelValue'])

const digits = ref([]);

function handleInput(event, digitId) {
  (event.target).parentElement.classList.remove('invalid');
  let newVal = props.modelValue;
  let data = event.data;
  if (!data || data?.trim() === '')
    newVal = newVal.substr(0, digitId) + '_' + newVal.substr(digitId + 1);
  else
    newVal = newVal.substr(0, digitId) + event.data + newVal.substr(digitId + 1);
  emit('update:modelValue', newVal);
  if (event.target.nextSibling)
    event.target.nextSibling.focus();
}

function handlePaste(event) {
  let pasted = (event.clipboardData).getData('text');
  emit('update:modelValue', pasted);
}

function concatDigits() {
  return `
    ${digits.value[1] ? digits.value[1] : ''}
    ${digits.value[2] ? digits.value[2] : ''}
    ${digits.value[3] ? digits.value[3] : ''}
    ${digits.value[4] ? digits.value[4] : ''}
  `.replace(/\s/g, '');
}

const digitsFromValue = computed(() => {
  return props.modelValue.split('');
})

</script>
<style lang="scss" scoped>
.input-code {
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
    max-width: 20rem;
    box-sizing: border-box;
    padding: 0.5rem;
    font-weight: $bold-font-weight;
    height: 40px;
    width: 2rem;
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
    max-width: 20rem;
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

.invalid.input-code__wrapper {
  border: solid 1px var(--error-color);
}

.invalid .input-code__input::placeholder {
  color: var(--light-error-color) !important;
}

.invalid .input-code__input:focus {
  box-shadow: 0 0 0 0.2rem var(--light-error-color);
}

.input-code__input::-webkit-inner-spin-button,
.input-code__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
