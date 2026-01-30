<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-3xl border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-green-300 text-white text-center text-xl font-bold py-4">
          Użytkownicy
        </div>

        <div
          v-for="u in users"
          :key="u.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400"
        >
          <div>
            <p class="font-semibold">
              {{ u.firstName }} {{ u.lastName }}
            </p>
            <p class="text-sm text-gray-700">
              {{ u.email }}
            </p>
            <p
              class="text-sm font-semibold"
              :class="u.isAdmin ? 'text-red-600' : 'text-green-600'"
            >
              {{ u.isAdmin ? 'Administrator' : 'Użytkownik' }}
            </p>
          </div>
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
  name: "UserView",
  data() {
    return {
      users: [],
      loading: false,
      error: "",
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = "";

      try {
        const res = await api.get("/api/admin/users");
        this.users = res.data;
      } catch {
        this.error = "Nie udało się pobrać użytkowników";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>