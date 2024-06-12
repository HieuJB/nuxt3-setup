import * as bootstrap from "bootstrap";

export default defineNuxtPlugin(nuxtApp => {
  
  nuxtApp.provide('bootstrap', bootstrap)
})

declare module '#app' {
  interface NuxtApp {
    $bootstrap: typeof bootstrap
  }
}