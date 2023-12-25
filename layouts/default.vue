<script setup lang="ts">
import SideBar from '~/components/SideBar.vue';
import { useRootStore } from '~/store/root';

const { fetchUser } = useRootStore()
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  await fetchUser()
  loading.value = false
})

</script>

<template>
  <el-container v-loading="loading" class="main">
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