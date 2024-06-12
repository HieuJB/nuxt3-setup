export function usePagination() {
  const currentPageNumber = ref(1)
  const goToTop = (): void => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }
  const onLoadPage = (pageNumber: number, noneScrollTop: boolean, paramInUrl: boolean): void => {
    if (!noneScrollTop) {
      goToTop()
    }
    if (paramInUrl) {
      // handle redirect url
    } else {
      currentPageNumber.value = pageNumber
    }
  }
  return {
    currentPageNumber,
    onLoadPage
  }
}
