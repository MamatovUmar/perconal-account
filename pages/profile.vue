<script setup lang="ts">

import { definePageMeta, reactive, useCustomFetch } from '#imports';
import { useRootStore } from '~/store/root';
import type { FormInstance, FormRules } from 'element-plus';
import type { IUser, IUserForm } from '~/types/user';
import { cities } from '~/server/constants';
import { ElMessage } from 'element-plus';

definePageMeta({
  middleware: ['auth-required']
})

const root = useRootStore()

const formRef = ref<FormInstance>()
const form = reactive<IUserForm>({
  firstname: '',
  lastname: '',
  birthdate: '',
  city: ''
})
const rules = reactive<FormRules>({
  firstname: { required: true, trigger: 'blur' },
  lastname: { required: true, trigger: 'blur' },
  birthdate: { required: true, trigger: 'blur' },
  city: { required: true, trigger: 'change' }
})

async function submitForm() {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      root.user = await useCustomFetch<IUser>('/api/user', {
        method: 'POST',
        body: form
      })
      ElMessage.success('Saved')
    } catch (e) {
      console.log(e)
    }
  })
}

watchEffect(() => {
  if (root.user) {
    form.firstname = root.user.firstname
    form.lastname = root.user.lastname
    form.birthdate = root.user.birthdate
    form.city = root.user.city
  }
})

</script>

<template>
  <div class="page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Profile</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="never">
      <div class="page__title">
        Profile info
      </div>

      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="firstname" label="Firstname">
              <el-input v-model="form.firstname" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="lastname" label="Lastname">
              <el-input v-model="form.lastname" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="birthdate" label="Birthdate">
              <el-date-picker
                v-model="form.birthdate"
                type="date"
                format="DD.MM.YYYY"
                value-format="YYYY-MM-DD"
                class="w-100"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="city" label="City">
              <el-select v-model="form.city" class="w-100">
                <el-option v-for="city of cities" :label="city" :value="city" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button type="primary" class="w-100" @click="submitForm">
              Save
            </el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<style scoped>

</style>