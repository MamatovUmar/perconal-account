// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,

    timeline: {
      enabled: true
    }
  },
  css: [
    '~/assets/styles/main.scss'
  ],
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      baseUrl: '/api'
    }
  }
})