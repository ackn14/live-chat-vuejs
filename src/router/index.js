import { createRouter, createWebHistory } from 'vue-router'
// Welcome.vueファイル読み込み
import Welcome from '../views/Welcome'

const routes = [
  // Welcome.vueファイル読み込み
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
