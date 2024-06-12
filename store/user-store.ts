/*
- example
- todo
*/
import { defineStore } from 'pinia'

export interface IUserData {
  id: number
  username: string
  phone: string
  email: string
  fullName: string
  gender: string
  token: string
  birthDay?: string
  // update more
}

const defaultUserData = {}

export const userStore = defineStore('userData', {
  state: (): IUserData => defaultUserData,
  persist: {
    storage: persistedState?.localStorage
  },
  actions: {
    setCurrentUserData(data: IUserData) {
      this.$state = data
    },
    reset() {
      this.$state = defaultUserData
    }
  }
})
