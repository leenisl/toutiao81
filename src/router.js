import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import login from './views/login'
import homepage from './components/home/homepage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: homepage
        },
        {
          path: '/home/comment',
          component: () => import('./views/common/comment.vue')
        },
        {
          path: '/home/material',
          component: () => import('./views/common/material.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
