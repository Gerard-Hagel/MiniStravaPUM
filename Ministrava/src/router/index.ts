import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import StatsView from '../views/StatsView.vue'
import ActivityView from '../views/ActivityView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import DeniedAccessView from '../views/DeniedAccessView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/welcome', name: 'Welcome', component: WelcomeView, meta: { requiresAdmin: true } },
  { path: '/user', name: 'User', component: UserView, meta: { requiresAdmin: true } },
  { path: '/stats', name: 'Stats', component: StatsView, meta: { requiresAdmin: true } },
  { path: '/activity', name: 'Activity', component: ActivityView, meta: { requiresAdmin: true } },
  { path: '/denied', name: 'Denied', component: DeniedAccessView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (!token) {
    if (to.name === "Home" || to.name === "Login") {
      return next()
    } else {
      return next({ name: "Login" })
    }
  }

  let payload: { [key: string]: any } = {}
  try {
    const base64Payload = token.split('.')[1] ?? ''
    payload = JSON.parse(atob(base64Payload))
  } catch (err) {
    console.error("Nieprawidłowy token JWT:", err)
    localStorage.removeItem("token")
    return next({ name: "Login" })
  }

  const rolesClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  const roles = Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim]

  if (to.name === "Home") {
    return next({ name: "Welcome" })
  }

  if (to.meta.requiresAdmin && !roles.includes("Admin")) {
    return next({ name: "Denied" })
  }

  next()
})

export default router