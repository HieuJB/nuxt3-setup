import { hotmatch } from '@/constants/common'
export const useMatchs = () => {
  // const { $apis } = useNuxtApp()

  const isLoading = ref(false)
  const matchs = ref({})

  const sortMatchsByCountry = item => {
    return item.reduce((acc, match) => {
      if (!acc[match.competition_name]) {
        acc[match.competition_name] = []
      }
      acc[match.competition_name].push(match)
      return acc
    }, {})
  }

  const sortFavorite = (payload: Object) => {
    // matchs.value
    const data = Object.values(matchs.value)[payload.id]
    if (payload.status) {
      for (const value of data) {
        value.isFavorite = true
      }
      return
    }
    for (const value of data) {
      value.isFavorite = false
    }
  }

  const getHotMatch = async (payload: string) => {
    try {
      isLoading.value = true
      const { data } = hotmatch
      matchs.value = sortMatchsByCountry(data)
    } catch {
      alert('Todo')
    } finally {
      isLoading.value = false
    }
  }

  const sortOrderDescending = ref({})

  function toggleSortById(countryName: string) {
    if (matchs.value[countryName]) {
      const array = matchs.value[countryName]
      if (sortOrderDescending.value[countryName] === undefined) {
        sortOrderDescending.value[countryName] = true
      }
      if (sortOrderDescending.value[countryName]) {
        array.sort((a, b) => a.id - b.id)
      } else {
        array.sort((a, b) => b.id - a.id)
      }
      sortOrderDescending.value[countryName] = !sortOrderDescending.value[countryName]
    } else {
      console.error('nothing.')
    }
  }

  const sortMatchsByID = (id: number) => {
    toggleSortById(id)
  }
  return {
    getHotMatch,
    isLoading,
    matchs,
    sortMatchsByID,
    sortFavorite
  }
}
