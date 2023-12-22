import { defineStore } from 'pinia'
import type { IUser } from '~/types/user';

export const useRootStore = defineStore('root', {
  state: (): RootState => ({
    user: null
  }),

  actions: {
    async fetchUser() {
      try {
        this.user = await useCustomFetch<IUser>('/user')
      } catch (e) {
        console.log(e)
      }
    }
  }
})

interface RootState {
  user: IUser | null
}