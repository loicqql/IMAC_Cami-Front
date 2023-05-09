<template>
  <div class="quiz-search">
    <form class="quiz-search__form" @submit.prevent="() => { }">
      <div class="quiz-search__select">
        <input type="text" v-model="val" placeholder="Votre réponse" @input="handleInput"
          @click="() => inputActive = true" @keyup.up="keyboardIndex <= 0 ? keyboardIndex : keyboardIndex--"
          @keyup.down="keyboardIndex < options.length - 1 ? keyboardIndex++ : keyboardIndex = 0"
          @keyup.enter="handleClick(options[keyboardIndex != -1 ? keyboardIndex : 0].id)" />
        <div class="answers" v-if="val.length > 0 && inputActive">
          <option :class="index == keyboardIndex ? 'active' : ''" v-for="( option, index ) in  options " :key="index"
            :value="option.id" @click="handleClick(option.id)">
            {{ option.title }}</option>
        </div>
      </div>
      <!-- <button class="quiz-search__button" type="submit">X</button> -->
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const val = ref('');
const selected = ref('');
const inputActive = ref(true);
const keyboardIndex = ref(-1);
const options = ref([]);

const emit = defineEmits(['answer']);

function handleClick(id) {
  inputActive.value = false;
  selected.value = options.value.filter(opt => opt.id == id)[0];
  val.value = selected.value.title;
  keyboardIndex.value = -1;
  pushAnswer();
}


function pushAnswer() {
  if (selected.value.id) {
    emit('answer', selected.value.id);
  }
}

async function handleInput() {
  inputActive.value = true;
  if (val.value != '') {
    let res = await $fetch('/api/tmdb/search/movie', { params: { query: val.value } });
    options.value = res.slice(0, 6);
  }
}

</script>

<style lang="scss" scoped>
.quiz-search {
  width: 100%;
  height: 75px;
  background-color: #fff;

  &__form {
    width: 100%;
    display: flex;
  }

  &__button {
    padding: 20px 30px;
    background-color: $y-primary;
    font-weight: $semi-bold-font-weight;
    appearance: none;
    cursor: pointer;
    border-radius: 7px;
    overflow: hidden;
    border: none;
    outline: none;
    margin-left: 10px;
  }

}

//select
.quiz-search__select {
  width: 100%;
  // width: calc(100% - 66px);
  position: relative;
  @include d-flex-center;

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

  input {
    width: 100%;
    outline: none;
    box-shadow: none;
    border: none;
    padding: 20px 30px;
    background-color: $y-secondary;
    font-weight: $semi-bold-font-weight;
    appearance: none;
    border-radius: 7px;
    overflow: hidden;

    // &:focus {
    //   box-shadow: 0 0 0 0.1rem $y-secondary-2;
    // }
  }

  .answers {
    position: absolute;
    top: 120%;
    width: 100%;
  }

  .answers option {
    outline: none;
    box-shadow: none;
    border: none;
    padding: 7px 10px;
    background-color: $y-secondary;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      background-color: $y-secondary-2;
    }

    &.active {
      background-color: $y-secondary-2;
    }
  }

}
</style>
