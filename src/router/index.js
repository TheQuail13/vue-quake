import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../components/EventList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'List',
    component: EventList
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ '../components/QuakeMap.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
