import { defineStore } from 'pinia'
import api from '../api/axios'

interface User {
  id: string
  email: string
  role: string
  [key: string]: any
}

interface LoginResponse {
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post<LoginResponse>('/api/login', { email, password })
      console.log("Token:", data.token)
      this.token = data.token
      localStorage.setItem('token', data.token)

      const me = await api.get<User>('/api/me')
      console.log('User profile:', me.data)
      this.user = me.data

      if (this.user.role !== 'Admin') {
        this.logout()
        throw new Error('Brak uprawnień administratora')
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})