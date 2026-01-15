<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <form @submit.prevent="onSubmit" class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Zaloguj się</h1>
    <div class="mb-4">
      <label class="block mb-1 font-semibold">Email</label>
      <input v-model="email" type="email" required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"/>
    </div>
    <div class="mb-6">
      <label class="block mb-1 font-semibold">Hasło</label>
      <input v-model="password" type="password" required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"/>
    </div>
    <button type="submit"
      class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
      :disabled="loading">
      {{ loading ? 'Logowanie...' : 'Zaloguj' }}
    </button>
    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
  </form>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push('/admin/dashboard')
  } catch (e: any) {
    error.value = e.message || 'Błąd logowania'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
button {
  width: 100%;
  padding: 0.5rem;
}
.error {
  color: red;
}
</style>