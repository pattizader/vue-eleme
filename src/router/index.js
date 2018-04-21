import Vue from 'vue'
import Router from 'vue-router'
import goods from 'pages/goods/goods'
import seller from 'pages/seller/seller'
import ratings from 'pages/ratings/ratings'

Vue.use(Router)
const routes = [
  {
  path: '/',
  redirect: '/goods'
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
]
export default new Router({
  linkActiveClass: 'active',
  routes
})
