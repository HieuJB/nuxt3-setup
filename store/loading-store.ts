import { defineStore } from 'pinia'

export interface LoadingType {
  isLoading: boolean
}

export const loadingStore = defineStore('loadingData', {
  state: (): LoadingType => ({
    isLoading: false
  })
})
