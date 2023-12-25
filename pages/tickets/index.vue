<script setup lang="ts">
import { useRootStore } from '~/store/root';
import { View, Search } from '@element-plus/icons-vue';
import { computed, reactive } from 'vue';
import type { ITicket } from '~/types/user';

const root = useRootStore()
const search = ref<string>('')
const pageSize = ref(4)
const currentPage = ref(1)
const sortOptions = reactive<SortOptions>({
  prop: 'id',
  order: null
})

const filteredTickets = computed(() => {
  const data = root.tickets.filter((el) => el.title.toLowerCase().includes(search.value.toLowerCase()))
  if (sortOptions.order) {
    data.sort((a, b) => {
      if (sortOptions.order === 'ascending') {
        return a[sortOptions.prop] < b[sortOptions.prop] ? 1 : -1
      } else {
        return b[sortOptions.prop] < a[sortOptions.prop] ? 1 : -1
      }
    })
  }

  return data
})
const tickets = computed(() => {
  if (filteredTickets.value.length === 0) return []

  const chunkArr = arrayToChunks(filteredTickets.value, pageSize.value)
  return chunkArr[currentPage.value - 1]
})

function pageChange(page: number) {
  currentPage.value = page
}

function arrayToChunks(array: ITicket[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function sortTickets({ order, prop }: SortOptions) {
  sortOptions.order = order
  sortOptions.prop = prop
}

onMounted(async () => {
  await root.getTickets()
})

interface SortOptions {
  prop: keyof ITicket
  order: 'ascending' | 'descending' | null
}

</script>

<template>
  <div class="page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Tickets</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="never">
      <div class="page__title">
        Tickets
      </div>

      <el-input
        v-model="search"
        class="w-100 mb-2"
        size="large"
        placeholder="Search by title"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>

      <el-table
        :data="tickets"
        :default-sort="{ prop: 'date', order: 'descending' }"
        class="mb-3 w-100"
        sortable
        @sort-change="sortTickets"
      >
        <el-table-column prop="id" label="ID" sortable="custom" width="100px"/>

        <el-table-column prop="title" label="Title" />

        <el-table-column prop="text" label="Text">
          <template #default="{ row }">
            {{ row.text?.slice(0, 40) }}...
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="Date" sortable="custom" />

        <el-table-column prop="username" label="User">
          <template #default="{ row }">
            <nuxt-link to="/profile"> {{ row.username }} </nuxt-link>
          </template>
        </el-table-column>

        <el-table-column width="60px">
          <template #default="{ row }">
            <el-button
              type="success"
              :icon="View"
              circle
              @click="navigateTo(`/tickets/${row.id}`)"
            />
          </template>
        </el-table-column>

      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="filteredTickets.length"
        :page-size="pageSize"
        @change="pageChange"
      />
    </el-card>
  </div>
</template>

<style scoped>

</style>