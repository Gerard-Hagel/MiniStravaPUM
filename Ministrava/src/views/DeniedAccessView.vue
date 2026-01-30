<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md text-center">
      <h1 class="text-2xl font-bold mb-4 text-red-600">Brak dostępu</h1>
      <p>Nie masz uprawnień, aby wejść na tę stronę.</p>
      <button
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        @click="$router.push('/login')"
      >
        Powrót
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeniedAccessView",
};
</script>