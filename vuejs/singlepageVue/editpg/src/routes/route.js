//import home from '../components/HelloWorld.vue';
import AddEd from '../components/addedit.vue';
import listuser from '../components/list.vue'


export const routes=[
    {path:'/User/List',component:listuser},
    {path:'/User/Add',component:AddEd},
    {path:'*',redirect:'/User/List'}
]