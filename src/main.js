
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

import Notifications from '@kyvg/vue3-notification';


const app = createApp(App)
    .use(store)
    .use(router)
    .use(SoftUIDashboard)
    .use(Notifications)
app.mount('#app')

app.config.errorHandler = (err, instance, info) => {
  console.error('Erro capturado:', err);
  // Você pode adicionar lógica adicional para lidar com erros aqui
};
