<script setup lang="ts">
import TicketsTable from '~/components/TicketsTable.vue';
</script>

<template>
  <div class="page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Tickets</el-breadcrumb-item>
    </el-breadcrumb>

    <TicketsTable />
  </div>
</template>

<style scoped>

</style>