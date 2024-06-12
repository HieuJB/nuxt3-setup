import Swal from "sweetalert2";
/*
- example
- todo
*/

type AlertType = 'default' | 'custom';


interface IAlert {
  type: AlertType,
  message: string
}


export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.provide('alert', (payload: IAlert) => {

    const options = {
      default: {
        title: 'Thông báo',
        text: payload.message,
        customClass: {
          header: 'modal-header',
          title: 'cut-popup error-popup',
          closeButton: 'close',
          content: 'modal-body',
        },
        showCloseButton: true,
        showConfirmButton: false,
      },

      custom: {
        title: 'Thông báo tùy chỉnh',
        text: 'Đây là một thông báo tùy chỉnh',
        customClass: {
          header: 'modal-header-custom',
          title: 'cut-popup-custom error-popup-custom',
          closeButton: 'close-custom',
          content: 'modal-body-custom',
        },
        showCloseButton: true,
        showConfirmButton: true,
      }
    }
    Swal.fire(options[payload.type])
  });
});

declare module '#app' {
  interface NuxtApp {
    $alert: ({ type, message }: IAlert) => void;
  }
}