<script setup lang="ts">

const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <header class="header">
    <div class="header__title">{{ title }}</div>
    <slot/>
  </header>
</template>

<style scoped lang="scss">
.header {
  margin-bottom: 20px;
  padding: 20px;
  background: var(--main-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>