<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
    <nav class="bg-green-200 p-4 flex w-full justify-between items-center">
      <div class="flex space-x-4 min-h-[48px] items-center">
        <template v-if="isLoggedIn && showAdminNav">
          <RouterLink to="/user" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Użytkownicy</RouterLink>
          <RouterLink to="/activity" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Aktywności</RouterLink>
          <RouterLink to="/stats" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Statystyki</RouterLink>
        </template>
      </div>

      <div>
        <button
          v-if="showLoginButton"
          to="/login"
          class="nav-btn px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg"
          @click="login">
          Zaloguj się
        </button>

        <button
          v-if="showLogoutButton"
          class="nav-btn px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg"
          @click="logout">
          Wyloguj się
        </button>
      </div>
    </nav>

    <div class="flex-1">
      <RouterView />
    </div>

    <!-- do testowania -->
    <!-- <div class="fixed left-0 bottom-0">
      <RouterLink to="/">Home&nbsp;</RouterLink>
      <RouterLink to="/login">Login&nbsp;</RouterLink>
      <RouterLink to="/welcome">Welcome&nbsp;</RouterLink>
      <RouterLink to="/user">User&nbsp;</RouterLink>
      <RouterLink to="/stats">Stats&nbsp;</RouterLink>
      <RouterLink to="/activity">Activity&nbsp;</RouterLink>
      <RouterLink to="/denied">DeniedAccess&nbsp;</RouterLink>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './store/auth.store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const isLoggedIn = computed(() => !!auth.token)
const showAdminNav = computed(() => auth.isAdmin)

const showLoginButton = computed(() =>
  route.name === 'Home'
)

const showLogoutButton = computed(() =>
  isLoggedIn.value && route.name !== 'Login' && route.name !== 'Home'
)

const login = () => {
  auth.logout()
  router.push('/login')
}

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>