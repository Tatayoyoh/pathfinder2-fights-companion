import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import 'vue3-easy-data-table/dist/style.css';
import '@/theme/main.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/vue/css/palettes/dark.always.css';
import '@ionic/vue/css/palettes/dark.class.css';
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Translation */
import { createI18n } from 'vue-i18n'
import { messages } from '@/locales/messages'
export const i18n:any = createI18n({
  legacy: false, // to use Vue3 composition API `<script setup>`
  locale: window.navigator.language ? window.navigator.language:'en',
  fallbackLocale: 'en',
  inheritLocale: true,
  globalInjection: true,
  useScope: "local",
  messages: messages
});

/* Pinia for storage */
import { createPinia } from 'pinia';
const pinia  = createPinia();

const app = createApp(App)
  .use(IonicVue)
  .use(i18n)
  .use(pinia)
  .use(router);

/* Import once all Ionic components into app */
import * as IonComponents from '@ionic/vue';
Object.keys(IonComponents).forEach(key => {
  if (/^Ion[A-Z]\w+$/.test(key)) {
    app.component(key, IonComponents[key]);
  }
});

// Popper
import Popper from "vue3-popper";
app.component("Popper", Popper);

router.isReady().then(() => {
  app.mount('#app');
});

