import { fileURLToPath } from "url";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devServer: {
    port: process.env.PORT || 3000,
  },
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        }
      ],
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [{
        hid: 'description',
        name: 'description',
        content: process.env.SLOGAN
      }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    './modules/auto-import-eslint.ts',
    'nuxt-icons',
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-proxy'
  ],

  i18n: {
    vueI18n: './lang/i18n.config.ts' // if you are using custom path, default 
  },
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
      rapidapi: process.env.RAPIDAPI_KEY,
      flat: process.env.URL_FLAT
    },
    proxy: {
      options: {
        target: process.env.API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
        pathFilter: [
          '/api'
        ]
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/base/colors.scss"; @import "@/assets/styles/base/variables.scss";
          @import "@/assets/styles/base/mixins.scss"; @import "@/assets/styles/base/functions.scss";`,
        },
      },
    }
  },
  alias: {
    'assetImage': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'assetStyle': fileURLToPath(new URL('./assets/styles', import.meta.url)),
  },
  components: [
    { path: '~/components', pathPrefix: true },
  ],
})
