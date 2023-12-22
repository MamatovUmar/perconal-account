<script setup lang="ts">
import { definePageMeta, reactive, useCustomFetch, useRouter } from '#imports'
import type { LoginForm } from '~/types/login'
import type { FormInstance, FormRules  } from 'element-plus'

definePageMeta({
  middleware: ['only-guests'],
  layout: 'auth'
})

const token = useCookie('token')
const formRef = ref<FormInstance>()
const form = reactive<LoginForm>({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  password: { required: true, trigger: 'blur' },
  username: { required: true, trigger: 'blur' }
})

async function submitForm() {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      const data = await useCustomFetch<{token: string}>('/api/login', {
        method: 'POST',
        body: form
      })
      if (data?.token) {
        token.value = data.token
        await navigateTo('/')
      }
    } catch (e) {
      console.log(e)
    }
  })
}

</script>

<template>
  <div class="login">
    <el-card shadow="never" class="login__card">
      <div class="login__title">Sign In</div>

      <el-form :model="form" ref="formRef" size="large" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="Username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="Password" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="w-100" @click="submitForm">
            Log in
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  min-height: 100vh;
  &__card {
    margin: auto;
    width: 100%;
    max-width: 450px;
  }
  &__title {
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>