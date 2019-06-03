import Vue from 'vue'
import viewresource from 'vue-resource';
import App from './App.vue'

import todo  from './components/HelloWorld.vue';

Vue.use(viewresource);
//Vue.http.options.root='https://rkdemotask.herokuapp.com/tasks/';
Vue.component('app-todo',todo);


new Vue({
  el: '#app',
  render: h => h(App)
})