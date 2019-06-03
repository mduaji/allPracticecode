import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vuerouter from 'vue-router';
import { routes } from './routes/route.js';
import Veevalidate from "vee-validate"

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(vuerouter);
Vue.use(Veevalidate);
const router = new vuerouter({
  routes,
  mode: 'history'
});


new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
