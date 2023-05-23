<template>
  <div class="input-range">
    <div class="input-range__wrapper">
      <input class="input-range__input" @input="handleInput($event.target.value)" :value="val" type="range" :min="min"
        :max="max">
    </div>
    <div class="input-range__number">
      <span class="" :style="{ '--left': (props.val - props.min) / (props.max - props.min) * 100 + '%' }">{{ val }}</span>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  val: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['update:val']);

function handleInput(event) {
  emit('update:val', parseInt(event));
}

</script>

<style lang="scss" scoped>
.input-range {
  position: relative;
  padding-bottom: 20px;

  &__wrapper {
    position: relative;

    @mixin circle {
      content: '';
      position: absolute;
      top: 50%;
      width: 34px;
      height: 34px;
      background: $y-secondary;
      border: 1px solid $y-secondary-2;
      border-radius: 100px;
      z-index: 1;
    }

    &::before {
      @include circle();
      right: 0;
      transform: translate(1px, -50%);
    }

    &::after {
      @include circle();
      left: 0;
      transform: translate(2px, -50%);
    }
  }

  &__input {
    appearance: none;
    width: 100%;
    height: 10px;
    background: $y-secondary;
    border: 1px solid $y-secondary-2;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
    border-radius: 50px;
    position: relative;
    z-index: 2;

    @mixin slider-track {
      clip-path: polygon(35px 0, calc(100% - 35px) 0, calc(100% - 35px) 100%, 35px 100%);
    }

    @mixin slider-thumb {
      appearance: none;
      width: 35px;
      height: 35px;
      background: $y-primary;
      cursor: pointer;
      border: none;
      border-radius: 100px;
    }

    &::-moz-range-thumb {
      @include slider-thumb;
    }

    &::-webkit-slider-thumb {
      @include slider-thumb;
    }

    // &::-moz-range-progress {
    //   @include slider-track;
    // }

    // &::-webkit-slider-progress {
    //   @include slider-track;
    // }

    &:focus {
      box-shadow: none;
    }
  }

  &__number {
    position: relative;
    width: calc(100% - 40px);
    height: 15px;
    margin-left: 17px;

    span {
      position: absolute;
      transform: translateY(20px);
      bottom: 0;
      left: var(--left);
    }
  }
}
</style>
