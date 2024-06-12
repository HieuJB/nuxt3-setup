import apis from '@/api'
import {type RepositoryProps} from '@/api'

/*
- example: useNuxtApp().apis.user.login()
- todo 
*/

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('apis', apis)
});


declare module '#app' {
  interface NuxtApp {
    $apis: RepositoryProps
  }
}