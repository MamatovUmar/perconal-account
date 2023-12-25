<script setup lang="ts">
import { ArrowLeftBold, House, Memo, User, UserFilled } from '@element-plus/icons-vue';
import { useRootStore } from '~/store/root';
import { useRoute } from '#imports';
import { useAuth } from '~/composables/useAuth';

const root = useRootStore()
const route = useRoute()
const auth = useAuth()

</script>

<template>
  <el-aside width="250px" class="sidebar">
    <div>
      <div v-if="root.user" class="sidebar__profile">
        <el-avatar size="large" :icon="UserFilled" />
        <div class="sidebar__user">
          {{ root.user?.firstname }} {{ root.user?.lastname }}
        </div>
      </div>

      <el-menu
        background-color="transparent"
        class="sidebar__menu"
        router
        :default-active="route.path"
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
    </div>

    <el-menu
      background-color="transparent"
      class="sidebar__menu"
    >
      <el-menu-item index="/logout" @click="auth.logout()">
        <el-icon><ArrowLeftBold /></el-icon>
        <template #title>Logout</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.sidebar {
  background: var(--main-background);
  max-height: 100vh;
  display: grid;
  grid-template-rows: auto 56px;
  &__menu {
    border-right: none;
  }
  &__profile {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  &__user {
    font-weight: 500;
  }
  &__logout {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 14px;
    color: var(--danger-color);
    &:hover {
      background-color: var(--menu-hover-bg-color);
    }
  }
}
</style>