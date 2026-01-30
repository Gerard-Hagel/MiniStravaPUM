<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
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

          <button
            class="w-24 h-9 bg-red-500 text-white hover:bg-red-700 transition rounded-lg font-bold"
            @click="remove(a.id)"
          >
            Usuń
          </button>
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
  name: "ActivityView",
  data() {
    return {
      activities: [],
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      this.loading = true;
      this.error = "";

      try {
        const res = await api.get("/api/admin/activities");
        this.activities = res.data;
      } catch {
        this.error = "Nie udało się pobrać aktywności";
      } finally {
        this.loading = false;
      }
    },
    async remove(id) {
      if (!confirm("Usunąć aktywność?")) return;

      await api.delete(`/api/admin/activities/${id}`);
      await this.fetchActivities();
    },
  },
};
</script>