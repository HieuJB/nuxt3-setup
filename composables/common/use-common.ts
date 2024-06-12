import { useRuntimeConfig } from '#app'
import { useDevice } from '#imports'

export function useCommon() {
  const runTimeConfig = useRuntimeConfig()
  const { isMobile } = useDevice()

  const openLiveChat = (): void => {
    if (isMobile) {
      const openNewTab = window.open('about:blank', '_blank')
      if (openNewTab) {
        openNewTab.location.href = runTimeConfig.public.LIVE_CHAT_LINK
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newWindow: any = window
      newWindow.LiveChatWidget.call('maximize')
    }
  }

  return {
    openLiveChat
  }
}
