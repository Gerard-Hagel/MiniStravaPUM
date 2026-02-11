<template>
  <div class="min-h-screen flex flex-col items-center pt-16">
    <div class="w-full max-w-3xl border border-gray-400 rounded-xl shadow-md p-6 bg-white">
      <h2 class="text-xl font-bold mb-4">Szczegóły aktywności</h2>

      <div v-if="!activity">Ładowanie...</div>

      <div v-if="activity">
        <p><strong>Nazwa:</strong> {{ activity.name || 'Bez nazwy' }}</p>
        <p><strong>Typ:</strong> {{ activity.activityType }}</p>
        <p><strong>Użytkownik:</strong> {{ activity.userEmail }}</p>
        <p><strong>Odległość:</strong> {{ activity.distanceMeters }} m</p>
        <p><strong>Czas trwania:</strong> {{ formatDuration(activity.durationSeconds) }}</p>
        <p><strong>Start:</strong> {{ formatDate(activity.startTime) }}</p>
        <p><strong>Koniec:</strong> {{ formatDate(activity.endTime) }}</p>
        <p><strong>Notatki:</strong> {{ activity.notes || '-' }}</p>
        <div v-if="activity.photoUrl">
          <strong>Zdjęcie:</strong>
          <img :src="activity.photoUrl" alt="Activity photo" class="mt-2 max-w-full rounded" />
        </div>
      </div>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>

      <button
        class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        @click="$router.back()"
      >
        Powrót
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "../api/axios";

interface Activity {
  id: string;
  name?: string;
  activityType?: string;
  userEmail?: string;
  distanceMeters?: number;
  durationSeconds?: number;
  startTime?: string;
  endTime?: string;
  notes?: string;
  photoUrl?: string;
}

export default defineComponent({
  name: "ActivityDetailsView",
  data() {
    return {
      activity: null as Activity | null,
      activitiesList: [] as Activity[],
      error: "",
    };
  },
  async mounted() {
    try {
      const res = await api.get("/api/admin/activities");
      this.activitiesList = res.data;

      const id = this.$route.params.id;
      this.activity = this.activitiesList.find((a) => a.id === id) ?? null;

      if (!this.activity) {
        this.error = "Nie znaleziono aktywności";
      }
    } catch {
      this.error = "Nie udało się pobrać aktywności";
    }
  },
  methods: {
    formatDate(dateStr?: string) {
      return dateStr ? new Date(dateStr).toLocaleString() : "-";
    },
    formatDuration(seconds?: number) {
      if (!seconds) return "-";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h}h ${m}m ${s}s`;
    },
  },
});
</script>