import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import vueaxios from 'vue-axios'


Vue.use(Vuex);

Vue.use(vueaxios, axios);

export default new Vuex.Store({
    state: {
        arr: []
    },
    actions: {
        loadData({ commit }) {
            axios
                .get('http://localhost:5000/api/get')
                .then(response => {
                    console.log(response);
                    const posts = response.data
                    commit('set_Data', posts)
                })
        },
        postData({ commit }, { EmpId, Name, Role, PreOrganization }) {
            console.log(">>>>>ID: " + EmpId)
            const data = {
                EmpId: EmpId,
                Name: Name,
                Role: Role,
                PreOrganization: PreOrganization
            }
            console.log(data)
            axios
                .post('http://localhost:5000/api/v1/post', [data])
                .then(response => {
                    console.log(response);
                    //const adddt = response.data
                    commit('Add_Data', { adddt: response.data })
                })
        },
        putData({ commit }, { EmpId, Name, Role, PreOrganization }) {
            const data = {
                Name: Name,
                Role: Role,
                PreOrganization: PreOrganization
            }
            console.log(data)
            axios
                .put(`http://localhost:5000/api/v1/put/${EmpId}`, data)
                .then(response => {
                    console.log(response);
                    //const adddt = response.data
                    commit('Updt_Data', { updtdt: response.data })
                })
        }
    },
    mutations: {
        set_Data(state, posts) {
            state.arr = posts
        },
        Add_Data(state, { adddt }) {
            state.arr.push(adddt)
        },
        Updt_Data(state, { updtdt }) {
            state.arr.push(updtdt);
            // let idx = state.arr.map(p => p.id).indexOf(updtdt.EmpId)
            // console.log(idx)
            // state.arr.splice(idx, 1)
        }
    }
})