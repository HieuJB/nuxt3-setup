export function useResetCookie() {
  function resetCookie(): void {
    useCookie('token').value = null
  }

  return {
    resetCookie
  }
}
