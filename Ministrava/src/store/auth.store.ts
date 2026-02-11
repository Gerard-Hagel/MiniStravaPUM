import { defineStore } from 'pinia'
import api from '../api/axios'

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1] ?? ''
    return JSON.parse(atob(base64Payload))
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,

    jwtPayload: (state) =>
      state.token ? parseJwt(state.token) : null,

    isAdmin(): boolean {
      return this.jwtPayload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
    },
  },

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
      localStorage.removeItem('token')
    },
  },
})