import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    name: 'Alicia Vikander',
    age: 20,
    dob: '20/08/1990'
  },
  mutations: {
    updateName:(state, name) => {
    state.name = name
  },
  loadUserData(state, payload){
    state.name = payload.name;
    state.age = payload.age;
    state.dob = payload.dob;
  }
  },
  actions: {
    getUserData(context, payload) {
      // Get the data from server
      axios.get('www.api.yourdomain').then((response) => {
        // commit to the store
        context.commit('loadUserData', response)
      })
    }
  }
})
