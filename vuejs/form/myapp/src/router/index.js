import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import post from '@/components/Add'



export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/add',
      name: 'post',
      component: post
    //   children: [
    //     {
    //         path: "/home",
    //         name: "Helloworld",
    //         component: HelloWorld
    //     }
    //]
    },
    
  ]
})