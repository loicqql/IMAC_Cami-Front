<template>
  <div class="user-score">
    <UserAvatarName :user="user" />
    <p>{{ userScore }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  userScore: {
    type: Number,
    required: true,
  }
});

</script>

<style lang="scss" scoped>

.user-score {
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $y-secondary;
  font-weight: $semi-bold-font-weight;
  border-radius: 7px;
  @include font-size(35);
}

</style>
