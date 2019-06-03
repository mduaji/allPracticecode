import home from './components/HelloWorld.vue';
import add from './components/add.vue';
// import pageNotFound from './components/pageNotFound.vue';
// import userNotFound from './components/usernotfound.vue';
import main from './components/header.vue';
import edit from './components/edit.vue';
//import serverNotfound from './components/serverNotFound.vue'

export const routes=[
    {path:'/dashboard',component:main},
    {path:'/user',component:home},
    {path:'/user/add',component:add},
    {path:'/user/edit/:id',component:edit},
    // {path:'/pagenotfound',component:pageNotFound},
    // {path:'/user/userNotFound',component:userNotFound},
    //{path:'/',component:serverNotfound},
    {path:'*',redirect:'/dashboard'}
  ];