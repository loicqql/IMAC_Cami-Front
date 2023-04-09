<template>
  <div class="ui">
    <!-- <inputRange v-model:val="valR" :min="1" :max="9" />
    {{ valR }}
    <inputSelect v-model:val="valS" />
    {{ valS }}

    <inputCheckbox v-model:val="valC" name="check" />
    {{ valC }}

    <userAvatar :img="2" />

    <UserAvatarName :user="{name: 'Paul', img: '5'}" />

    <userScore :user="{name: 'Paul', img: '5'}" :user-score="758"/>

    <gameLeaderBoard :players="players" /> -->

    <gameFinalScore :class="gameFinalScoreTest ? 'reveal' : ''" :players="players" />
  </div>

</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const valR = ref(4);
  const valS = ref('');
  const valC = ref(false);
  const gameFinalScoreTest = ref(false);

  const players = ref([
    {
      user: {name: 'Paul', img: 5},
      score: 758
    },
    {
      user: {name: 'Joe', img: 8},
      score: 500
    },
    {
      user: {name: 'Ben', img: 2},
      score: 1000
    }
  ]);

onMounted(() => {
  setTimeout(() => {
    gameFinalScoreTest.value = true;
  }, 1000)
})

</script>

<style lang="scss" scoped>
  .ui {
    padding: 50px;
    width: 100%;
  }
</style>
