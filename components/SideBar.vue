<script setup lang="ts">
import { Back, House, Memo, User, UserFilled } from '@element-plus/icons-vue';
</script>

<template>
  <el-aside width="250px" class="sidebar">
    <div class="sidebar__profile">
      <el-avatar size="large" :icon="UserFilled" />
    </div>

    <el-menu
      background-color="transparent"
      router
      class="sidebar__menu"
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <template #title>Home</template>
      </el-menu-item>

      <el-menu-item index="/profile">
        <el-icon><User /></el-icon>
        <template #title>Profile</template>
      </el-menu-item>

      <el-menu-item index="/tickets">
        <el-icon><Memo /></el-icon>
        <template #title>Tickets</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.sidebar {
  background: #F0F1F4;
  &__menu {
    border-right: none;
  }
  &__profile {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>