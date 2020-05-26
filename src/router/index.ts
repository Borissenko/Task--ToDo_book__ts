import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'

import Auth from '../views/Auth.vue'
import ToDo from '../views/ToDo.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.token === 'true' || localStorage.getItem('auth = ')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    beforeEnter(to: any, from: any, next: any) {
      if (store.state.token === 'false' && localStorage.getItem('auth = ')) {
        next('/todo')
      } else if (store.state.token === 'true' || localStorage.getItem('auth = ')) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
