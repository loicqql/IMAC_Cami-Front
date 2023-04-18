<template>
  <div class="user-avatar-name">
    <userAvatar class="user-avatar-name__avatar" />
    <p>{{ user.name }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

</script>

<style lang="scss" scoped>

.user-avatar-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: $semi-bold-font-weight;
  border-radius: 7px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @include font-size(18);

  &__avatar {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
}

</style>
