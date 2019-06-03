import view from "../components/add.vue";
//import login from "../components/login.vue";

export const routes=[
    {path:'/get',component:view},
    {path:'*',redirect:'/get'}
]