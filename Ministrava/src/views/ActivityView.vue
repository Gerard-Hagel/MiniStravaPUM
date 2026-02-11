<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex flex-col items-center pt-16 w-full">

      <!-- Filtry -->
      <div class="w-full max-w-4xl border border-gray-400 rounded-xl shadow-md p-4 mb-4 bg-gray-50">
        <h2 class="text-lg font-bold mb-2">Filtry</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

          <input
            v-model="filters.userEmail"
            type="text"
            placeholder="Email użytkownika"
            class="border px-2 py-1 rounded"
          />

          <input
            v-model="filters.from"
            type="date"
            placeholder="Od daty"
            class="border px-2 py-1 rounded"
          />

          <input
            v-model="filters.to"
            type="date"
            placeholder="Do daty"
            class="border px-2 py-1 rounded"
          />

          <input
            v-model.number="filters.minDistance"
            type="number"
            placeholder="Min dystans (m)"
            class="border px-2 py-1 rounded"
          />

          <input
            v-model.number="filters.maxDistance"
            type="number"
            placeholder="Max dystans (m)"
            class="border px-2 py-1 rounded"
          />

          <select v-model="filters.type" class="border px-2 py-1 rounded">
            <option value="">Wszystkie typy</option>
            <option value="Running">Bieganie</option>
            <option value="Cycling">Rower</option>
            <option value="Walking">Chodzenie</option>
            <option value="Hike">Hiking</option>
            <option value="Workout">Ćwiczenie</option>
          </select>

          <button
            class="col-span-2 md:col-span-1 bg-green-400 text-white rounded px-3 py-1 hover:bg-green-500"
            @click="applyFilters"
          >
            Filtruj
          </button>

          <button
            class="col-span-2 md:col-span-1 bg-gray-300 text-black rounded px-3 py-1 hover:bg-gray-400"
            @click="resetFilters"
          >
            Wyczyść
          </button>

        </div>
      </div>

      <!-- Lista aktywności -->
      <div class="w-full max-w-4xl border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-green-300 text-white text-center text-xl font-bold py-4">
          Aktywności
        </div>

        <div
          v-for="a in activities"
          :key="a.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400"
        >
          <div>
            <p class="font-semibold">
              {{ a.name || 'Bez nazwy' }} ({{ a.activityType }})
            </p>
            <p class="text-sm text-gray-700">
              {{ a.userEmail }}
            </p>
            <p class="text-sm">
              {{ a.distanceMeters }} m
            </p>
          </div>
          
          <div class="flex gap-2">
            <button
              class="w-9 h-9 bg-sky-400 text-white hover:bg-sky-600 rounded-lg font-bold text-lg"
              @click="$router.push({ name: 'ActivityDetails', params: { id: a.id } })"
            >
              i
            </button>

            <button
              class="w-12 h-9 bg-red-500 text-white hover:bg-red-700 transition rounded-lg font-bold"
              @click="remove(a.id)"
            >
              Usuń
            </button>
          </div>
        </div>

        <p v-if="loading" class="text-center py-4">Ładowanie...</p>
        <p v-if="error" class="text-center py-4 text-red-500">{{ error }}</p>

      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import api from '../api/axios'

interface Activity {
  id: string
  name?: string
  activityType?: string
  userEmail?: string
  distanceMeters?: number
  durationSeconds?: number
  startTime?: string
  endTime?: string
  notes?: string
  photoUrl?: string
}

const activities = ref<Activity[]>([])
const loading = ref(false)
const error = ref("")

const filters = ref({
  userEmail: "",
  from: "",
  to: "",
  minDistance: null as number | null,
  maxDistance: null as number | null,
  type: "",
})

async function fetchActivities(params: Record<string, any> = {}) {
  loading.value = true
  error.value = ""
  try {
    const res = await api.get("/api/admin/activities", { params })
    activities.value = res.data
  } catch (e) {
    error.value = "Nie udało się pobrać aktywności"
  } finally {
    loading.value = false
  }
}

async function remove(id: string) {
  if (!confirm("Usunąć aktywność?")) return
  await api.delete(`/api/admin/activities/${id}`)
  await fetchActivities(filters.value)
}

function applyFilters() {
  const params: Record<string, any> = {}
  if (filters.value.userEmail) params.userEmail = filters.value.userEmail
  if (filters.value.from) params.from = filters.value.from
  if (filters.value.to) params.to = filters.value.to
  if (filters.value.minDistance !== null) params.minDistance = filters.value.minDistance
  if (filters.value.maxDistance !== null) params.maxDistance = filters.value.maxDistance
  if (filters.value.type) params.type = filters.value.type

  fetchActivities(params)
}

function resetFilters() {
  filters.value = {
    userEmail: "",
    from: "",
    to: "",
    minDistance: null,
    maxDistance: null,
    type: "",
  }
  fetchActivities()
}

fetchActivities()
</script>