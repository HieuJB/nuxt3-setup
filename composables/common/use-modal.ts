import { createGlobalState } from '@vueuse/core'

export const useModal = createGlobalState(() => {
  const modalId: Ref<string> = ref('')

  const openModalById = (id: string) => {
    if (process.client) {
      modalId.value = id
    }
  }

  const closeModalById = () => {
    if (process.client) {
      modalId.value = ''
    }
  }

  return {
    modalId,
    openModalById,
    closeModalById
  }
})
