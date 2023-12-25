<script setup lang="ts">
import { definePageMeta, reactive } from '#imports'
import type { LoginForm } from '~/types/login'
import type { FormInstance, FormRules  } from 'element-plus'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: ['only-guests'],
  layout: 'auth'
})

const auth = useAuth()
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
    await auth.login(form)
  })
}

</script>

<template>
  <div class="login">
    <el-card shadow="never" class="login__card">
      <div class="login__title">Sign In</div>

      <el-form :model="form" ref="formRef" size="large" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="Username"
            @keyup.enter="submitForm"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            show-password
            @keyup.enter="submitForm"
          />
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