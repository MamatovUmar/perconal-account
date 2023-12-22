<script setup lang="ts">

import { definePageMeta } from '#imports';

definePageMeta({
  middleware: ['auth-required']
})

</script>

<template>
  <div>
    home
  </div>
</template>

<style scoped>

</style>