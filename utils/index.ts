import round from 'lodash/round'
import { useClipboard } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

interface INumberFormatter {
  formatNumber: (value: number, suffix: string) => string
  formatNumberWithDots: (x: number) => string
  formatNumberWithCommas: (x: number | null) => string
  roundFloatNumber: (number: number, precision: number) => number
  inputOnlyNumber: (value: string) => string
  formatMarkToNumber: (str: string, multiplier: number) => number
  formatTextAsterisk: (value: string, limit: number) => string
  randomInt: (min: number, max: number) => number
  truncateTo2Decimals: (value: number) => number
  convertToFixedFloat: (num: string | number) => number
}

interface IStringUtils {
  normalizeDiacriticsString: (str?: string) => string
  trimWord: (word?: string) => string
  maskCharacter: (str: string, mask: string, n?: number, isHideBack?: boolean) => string
  capitalizeFirstCharacter: (str: string) => string
}

interface DeviceHeader {
  os: string
  device: string
  browser: string
}

export const formatAmountUnit = (str: string | number, divider: number = 1000): string => {
  const numberValue = Number(str)
  return isNaN(numberValue) ? '0' : (numberValue / divider).toLocaleString('en-US')
}

export const formatMoney = (value: string | number, multiplier: number = 1): string => {
  if (typeof value === 'string') {
    const amount = Number(value.replace(/,/g, '')) * multiplier
    return amount.toLocaleString('en-US')
  }
  if (typeof value === 'number') {
    return value.toLocaleString('en-US')
  }
  return value
}

export type GlobImageI = Record<string, { default: string }>
export const getImageURL = (glob: GlobImageI, filename: string, baseUrl: string, fileType: string = 'png'): string => {
  return glob[`${baseUrl}/${filename?.toLowerCase()}.${fileType}`]?.default
}

export const NumberUtils: INumberFormatter = {
  formatNumber(value: number, suffix: string): string {
    return `${Intl.NumberFormat('en-US').format(value)} ${suffix}`
  },

  formatNumberWithDots(x: number | null): string {
    if (x !== null && x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return ''
  },

  roundFloatNumber(number: number, precision: number): number {
    return round(number, precision)
  },

  inputOnlyNumber(value: string): string {
    return value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
  },

  formatNumberWithCommas(x: number | null): string {
    if (x !== null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return ''
  },
  formatMarkToNumber(str: string, multiplier = 1): number {
    if (str !== '') {
      return Number(str.replace(/,/g, '')) * multiplier
    }
    return 0
  },
  formatTextAsterisk(str: string, limit: number): string {
    if (typeof str === 'string' && str !== '') {
      const strTemp = str.substring(0, limit)
      if (strTemp.length > 3) {
        return strTemp.replace(strTemp.substring(strTemp.length - 3), '***')
      }
      return strTemp
    }
    return str.toString()
  },
  randomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  },
  truncateTo2Decimals(value: number): number {
    return Math.round(value * 100) / 100
  },
  convertToFixedFloat(num: string | number): number {
    if (num) {
      const tempArr = String(num).split(' ')
      const roundedNum = parseFloat(tempArr[0]).toFixed(4)
      return parseFloat(roundedNum)
    }
    return 0
  }
}

export const StringUtils: IStringUtils = {
  normalizeDiacriticsString(str = ''): string {
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
    return str
  },
  trimWord(word = ''): string {
    return word.trim().replace(/\s\s+/g, ' ')
  },
  maskCharacter(str: string, mask: string, n = 4, isHideBack = false): string {
    if (str?.length <= n) {
      return str
    }
    if (isHideBack) {
      return ('' + str).slice(0, -n) + ('' + str).slice(-n).replace(/./g, mask)
    }
    return ('' + str).slice(0, -n).replace(/./g, mask) + ('' + str).slice(-n)
  },
  capitalizeFirstCharacter(str: string = ''): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

export const getDeviceHeaders = (): DeviceHeader => {
  const deviceHeaders = { os: 'os', device: 'device', browser: 'browser' }
  try {
    const {
      isIos,
      isAndroid,
      isWindows,
      isMacOS,
      isApple,
      isMobile,
      isTablet,
      isDesktop,
      isSafari,
      isFirefox,
      isEdge,
      isChrome,
      isSamsung
    } = useDevice()

    if (isIos) {
      deviceHeaders.os = 'ios'
    } else if (isAndroid) {
      deviceHeaders.os = 'android'
    } else if (isWindows) {
      deviceHeaders.os = 'windows'
    } else if (isMacOS) {
      deviceHeaders.os = 'macOS'
    } else if (isApple) {
      deviceHeaders.os = 'apple'
    }

    if (isMobile) {
      deviceHeaders.device = 'mobile'
    } else if (isTablet) {
      deviceHeaders.device = 'tablet'
    } else if (isDesktop) {
      deviceHeaders.device = 'desktop'
    }

    if (isSafari) {
      deviceHeaders.browser = 'safari'
    } else if (isFirefox) {
      deviceHeaders.browser = 'firefox'
    } else if (isEdge) {
      deviceHeaders.browser = 'edge'
    } else if (isChrome) {
      deviceHeaders.browser = 'chrome'
    } else if (isSamsung) {
      deviceHeaders.browser = 'samsung'
    }
  } catch {}

  return deviceHeaders
}

export const getAllUrlParams = (url: string): Record<string, string> => {
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  if (queryString) {
    queryString = queryString.split('#')[0]

    const arr = queryString.split('&')

    for (let i = 0; i < arr.length; i++) {
      const a = arr[i].split('=')

      const paramName = a[0]
      const paramValue = typeof a[1] === 'undefined' ? true : a[1]

      if (paramName.match(/\[(\d+)?\]$/)) {
        const key = paramName.replace(/\[(\d+)?\]/, '')
        if (!obj[key]) {
          obj[key] = []
        }

        if (paramName?.match(/\[\d+\]$/)) {
          const index = /\[(\d+)\]/.exec(paramName) ?? []
          obj[key][index[1]] = paramValue
        } else {
          obj[key].push(paramValue)
        }
      } else if (!obj[paramName]) {
        obj[paramName] = paramValue
      } else if (obj[paramName] && typeof obj[paramName] === 'string') {
        obj[paramName] = [obj[paramName]]
        obj[paramName].push(paramValue)
      } else {
        obj[paramName].push(paramValue)
      }
    }
  }
  return obj
}

export const isValidURL = (text: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(text)
}

const { copy } = useClipboard()
export const copyString = async (value: string): Promise<void> => {
  await copy(value)
}

export function useScrollIntoView(elementTopRef?: HTMLDivElement | null) {
  if (elementTopRef) {
    elementTopRef.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }
}

export const scrollToActiveCenterItem = (elementTopRefs: HTMLDivElement[], indexItem: number): void => {
  if (elementTopRefs?.length) {
    elementTopRefs[indexItem].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

export const limitValueLength = (text: string, limit: number = 10): string => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text
}
export const downloadImage = async (qrCode: string, nameImage: string = 'QR Code.png'): Promise<void> => {
  if (qrCode) {
    const image = await fetch(qrCode)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = nameImage
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const replaceBankCode = (code: string): string => {
  switch (code) {
    case 'vcb':
      return 'vcb'
    case 'acb':
      return 'acb'
    case 'sab':
      return 'Sacombank'
    case 'bidv':
      return 'bidv'
    case 'eab':
      return 'DongA'
    case 'tcb':
      return 'Techcombank'
    case 'vtb':
      return 'VietinBank'
    case 'mbbank':
      return 'MBbank'
    case 'vccb':
      return 'VietCapital'
    default:
      return code
  }
}

export const loadExternalScript = (url: string, callback: () => void): void => {
  const script = document.createElement('script')
  script.async = true
  script.src = url
  if (callback) {
    script.addEventListener('load', callback, false)
  }
  if (document) {
    document.body.appendChild(script)
  }
}

export const formatTime = (item: string, formatFrom: string, formatTo: string): string => {
  return dayjs(item, formatFrom).format(formatTo)
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray: T[] = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }
  return newArray
}
