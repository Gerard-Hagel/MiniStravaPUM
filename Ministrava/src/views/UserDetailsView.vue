<template>
  <div class="min-h-screen flex flex-col items-center pt-16">
    <div class="w-full max-w-2xl border border-gray-400 rounded-xl shadow-md p-6 bg-white">
      <h2 class="text-xl font-bold mb-4">Szczegóły użytkownika</h2>

      <div v-if="!user">Ładowanie...</div>

      <div v-if="user">
        <p><strong>Imię:</strong> {{ user.firstName }}</p>
        <p><strong>Nazwisko:</strong> {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Admin:</strong> {{ user.isAdmin ? 'Tak' : 'Nie' }}</p>
        <p><strong>Data utworzenia:</strong> {{ formatDate(user.createdAt) }}</p>
        <p><strong>Ostatnie logowanie:</strong> {{ user.lastLoginAt ? formatDate(user.lastLoginAt) : '-' }}</p>
      </div>

      <button
        class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        @click="$router.back()"
      >
        Powrót
      </button>
    </div>
  </div>
</template>

<script>
import api from "../api/axios";

export default {
  name: "UserViewDetails",
  data() {
    return {
      user: null,
      usersList: [],
      error: ""
    };
  },
  async mounted() {
    try {
      const res = await api.get("/api/admin/users");
      this.usersList = res.data;

      const id = this.$route.params.id;
      this.user = this.usersList.find(u => u.id === id);

      if (!this.user) {
        this.error = "Nie znaleziono użytkownika";
      }
    } catch (err) {
      this.error = "Nie udało się pobrać użytkowników";
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>