import Vue from 'vue'
import App from './App.vue'
import products from './components/product.vue';
import sidebar from './components/sidebar.vue';
Vue.component('app-products',products);
Vue.component('app-sidebar',sidebar);
new Vue({
  el: '#app',
  render: h => h(App)
})
