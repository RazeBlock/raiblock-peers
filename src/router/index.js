import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NetWorks from '@/components/NetWorks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/network',
      name: 'NetWork',
      component: NetWorks
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
