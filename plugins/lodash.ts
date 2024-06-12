import { defineNuxtPlugin } from "#app";
import lodash from "lodash";
import { LoDashStatic } from 'lodash'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('_', lodash)
});
declare module '#app' {
  interface NuxtApp {
    $_: LoDashStatic
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $_: LoDashStatic
  }
}