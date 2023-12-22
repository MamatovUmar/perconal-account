import { navigateTo } from '#imports';

export default defineNuxtRouteMiddleware(() => {
  const token  = useCookie('token')

  if (!token.value) {
    return navigateTo('/login')
  }
})