interface HidePasswordInterface {
  oldPassword: boolean
  currentPassword: boolean
  confirmPassword: boolean
}

export function useVisibilityPassword() {
  const hidePassword = reactive<HidePasswordInterface>({
    oldPassword: true,
    currentPassword: true,
    confirmPassword: true
  })

  function togglePasswordVisibility(type: keyof HidePasswordInterface): void {
    if (typeof hidePassword?.[type] === 'boolean') {
      hidePassword[type] = !hidePassword[type]
    }
  }

  return {
    hidePassword,
    togglePasswordVisibility
  }
}
