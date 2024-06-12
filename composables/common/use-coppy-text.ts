export const useCopyText = () => {
  const textCopied = ref()
  const copyText = async (text: string): Promise<void> => {
    textCopied.value = text
    await navigator.clipboard.writeText(text)
  }
  return { textCopied, copyText }
}
