import { defineStore } from 'pinia'
import type { ITicket, IUser } from '~/types/user';

export const useRootStore = defineStore('root', {
  state: (): RootState => ({
    user: null,
    tickets: []
  }),

  actions: {
    async fetchUser() {
      try {
        this.user = await useCustomFetch<IUser>('/user')
      } catch (e) {
        console.log(e)
      }
    },

    async getTickets() {
      try {
        this.tickets = await useCustomFetch<ITicket[]>('/tickets')
      } catch (e) {
        console.log(e)
      }
    }
  }
})

interface RootState {
  user: IUser | null
  tickets: ITicket[] | []
}