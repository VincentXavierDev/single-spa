import {createApp, h} from "vue";
import singleSpaVue from "single-spa-vue";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import './assets/tailwind.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice';


import App from "./App.vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
  handleInstance(app) {
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    });
    app.use(ToastService);
    app.component('VButton', Button);
    app.component('VToolbar', Toolbar);
    app.component('VInputText', InputText);
    app.component('VPassword', Password);
    app.component('VToast', Toast);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
