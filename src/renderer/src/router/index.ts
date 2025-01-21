import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import RouteAddRule from './add-rule'

const router = createRouter({
  history: import.meta.env.DEV
    ? createWebHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@renderer/windows/main/layout.vue')
    },
    RouteAddRule
  ]
})

export default router
