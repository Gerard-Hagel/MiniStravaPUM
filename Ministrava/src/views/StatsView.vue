<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-green-300 text-white text-center text-xl font-bold py-4">
          Statystyki globalne
        </div>

        <div class="px-6 py-6 space-y-4">
          <p class="font-semibold">
            Użytkownicy: {{ stats.usersCount }}
          </p>
          <p class="font-semibold">
            Aktywności: {{ stats.activitiesCount }}
          </p>
          <p class="font-semibold">
            Dystans: {{ stats.totalDistanceMeters }} m
          </p>
        </div>

        <p v-if="loading" class="text-center py-4">Ładowanie...</p>
        <p v-if="error" class="text-center py-4 text-red-500">{{ error }}</p>

      </div>
    </main>
  </div>
</template>

<script>
import api from "../api/axios";

export default {
  name: "StatsView",
  data() {
    return {
      stats: {},
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchStats();
  },
  methods: {
    async fetchStats() {
      this.loading = true;
      this.error = "";

      try {
        const res = await api.get("/api/admin/stats");
        this.stats = res.data;
      } catch {
        this.error = "Nie udało się pobrać statystyk";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>