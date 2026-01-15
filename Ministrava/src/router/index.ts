import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('../views/LoginView.vue') },
  // {
  //   path: '/admin',
  //   component: () => import('@/views/admin/AdminLayout.vue'),
  //   meta: { requiresAdmin: true },
  //   children: [
  //     { path: 'dashboard', component: () => import('@/views/admin/DashboardView.vue') },
  //     { path: 'users', component: () => import('@/views/admin/UsersView.vue') }
  //   ]
  // },
  { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAdmin && !auth.token) {
    return '/login'
  }
})

export default router