import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: null as any,
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await api.post('/api/login', {
        Login: email,
        Password: password,
      })

      if (!res.data.jwtToken) {
        throw new Error('Brak tokena w odpowiedzi')
      }

      this.token = res.data.jwtToken
      localStorage.setItem('token', res.data.jwtToken)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})