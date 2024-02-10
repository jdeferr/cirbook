import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@components/Layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/:query',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/book/:id',
          component: () => import('../views/BookView.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
