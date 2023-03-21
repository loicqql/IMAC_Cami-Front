<template>
  <div class="input-search">
    <div class="input-search__icon">
      l
    </div>
    <input @input="handleInput($event.target.value)" class="input-search__input" type="text" placeholder="Rechercher un film" :value="val">
    <!-- <div>
      <p v-for="(res, index) in results" :key="index">{{res.title}}</p>
    </div> -->
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
.input-search {
  width: 100%;
  height: 75px;
  background-color: #fff;
  border-bottom: 3px solid $y-primary;
  display: flex;

  &__icon {
    width: 75px;
    height: 100%;
    background-color: $y-primary;
    @include d-flex-center;
  }

  &__input {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    padding-left: 30px;
    &:focus {
      box-shadow: none;
    }
  }

}
</style>
