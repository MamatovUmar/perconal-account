<script setup lang="ts">
import { useRoute } from '#imports'
import type { ITicket } from '~/types/user'

const route = useRoute()

definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id as string)
  }
})

const ticket = ref<ITicket>()
const loading = ref<boolean>(false)

async function getTicket() {
  try {
    loading.value = true
    ticket.value = await useCustomFetch(`/tickets/${route.params.id}`)
    loading.value = false
  } catch (e) {
    console.log(e)
    loading.value = false
  }
}

function formatDate(date: string) {
  const inputDate = new Date(date)
  return inputDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

onMounted(async () => {
  await getTicket()
})

</script>

<template>
  <div v-loading="loading" class="page ticket">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item to="/tickets">Tickets</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ticket?.title ?? '' }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card v-if="ticket" shadow="never">
      <div class="page__title">{{ ticket.title }}</div>

      <div class="ticket__description">
        <div>Author:</div>
        <div class="val">{{ ticket.userName }}</div>
        <div>Date:</div>
        <div class="val">{{ formatDate(ticket.createdAt) }}</div>
      </div>

      <div class="ticket__text">
        {{ ticket.text }}
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.ticket {
  &__description{
    display: grid;
    grid-template-columns: 80px auto;
    margin-bottom: 20px;
    line-height: 20px;
    font-weight: 500;
    row-gap: 10px;
    .val {
      font-weight: 400;
    }
  }
  &__text {
    line-height: 130%;
  }
}
</style>