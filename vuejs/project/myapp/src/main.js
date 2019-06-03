import Vue from 'vue'
import App from './App.vue'
import vuerouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import veevalidate from "vee-validate"
import { routes } from './routes';
import Button from 'bootstrap-vue/es/components/button'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(vuerouter);
Vue.use(BootstrapVue);
Vue.use(veevalidate);
Vue.use(Button);
//Vue.config.productionTip = false

//Vue.use(vuerouter);

const router = new vuerouter({
  routes,
  //,
  //use mode property for normal routing bydefault type is hash
  mode: 'history'
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
