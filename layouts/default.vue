<script setup lang="ts">
import SideBar from '~/components/SideBar.vue';
import { useRootStore } from '~/store/root';

const { fetchUser } = useRootStore()

onMounted(async () => {
  await fetchUser()
})

</script>

<template>
  <el-container class="main">
    <SideBar />
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.main {
  height: 100dvh;
}
</style>