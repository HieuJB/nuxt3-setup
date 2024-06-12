import { vIntersectionObserver } from '@vueuse/components'

export const useInterSectionObserver = () => {
  const isVisible: Ref<boolean> = ref(false)
  const isMounted: Ref<boolean> = ref(false)
  const onIntersectionObserver = useThrottle(([{ isIntersecting }]: any): void => {
    if (!isMounted.value) {
      isVisible.value = isIntersecting
      isMounted.value = isIntersecting
    }
  }, 500)

  return {
    isVisible,
    onIntersectionObserver,
    vIntersectionObserver
  }
}
