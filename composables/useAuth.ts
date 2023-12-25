import { useCustomFetch } from '~/composables/useCustomFetch'
import type { LoginForm } from '~/types/login'
import { useRootStore } from '~/store/root'

export function useAuth() {
  const token = useCookie('token')
  const root = useRootStore()

  async function login(form: LoginForm) {
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
  }

  async function logout() {
    token.value = null
    await navigateTo('/login')
    root.user = null
  }

  return {
    login,
    logout
  }
}