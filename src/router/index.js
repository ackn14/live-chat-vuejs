import { createRouter, createWebHistory } from 'vue-router'
// Welcome.vueファイル読み込み
import Welcome from '../views/Welcome'
import Chatroom from '../views/Chatroom'

const routes = [
  // Welcome.vueファイル読み込み
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
