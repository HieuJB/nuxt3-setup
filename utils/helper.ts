import { countryToCountryCode } from '@/constants/common'

export const getFlatByCountry = (item: string): string => {
  const size: string = '64x48'
  const flat: string = useRuntimeConfig().public.flat
  return `${flat}${size}/${countryToCountryCode[item]?.toLowerCase()}.png`
}
