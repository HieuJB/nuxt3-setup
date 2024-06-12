import vi from './vi.json'
import en from './en.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'vi',
  messages: {
    vi,
    en
  }
}))
