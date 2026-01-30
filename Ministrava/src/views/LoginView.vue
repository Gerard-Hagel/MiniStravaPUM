<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-24">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <!-- Header -->
        <div class="bg-green-300 text-white text-center text-xl font-bold py-4">
          Logowanie
        </div>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="px-6 py-6">
          <div class="mb-4">
            <label class="block mb-1 font-semibold">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full border border-gray-300 rounded px-3 py-2
                     focus:outline-none focus:ring focus:border-green-500"
            />
          </div>

          <div class="mb-6">
            <label class="block mb-1 font-semibold">Hasło</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full border border-gray-300 rounded px-3 py-2
                     focus:outline-none focus:ring focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-400 text-white py-2 rounded-lg
                   font-bold hover:bg-green-500 transition
                   disabled:opacity-50"
          >
            {{ loading ? 'Logowanie...' : 'Zaloguj się' }}
          </button>

          <p
            v-if="error"
            class="text-red-500 mt-4 text-center font-semibold"
          >
            {{ error }}
          </p>
        </form>

      </div>
    </main>
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
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Błąd logowania'
  } finally {
    loading.value = false
  }
}
</script>