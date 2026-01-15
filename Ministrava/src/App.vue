<script>
  import { RouterLink, RouterView } from 'vue-router';
  export default {
    name: "HomeView",
  };
</script>
    
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
    <!-- <nav class="bg-green-500 p-4 flex w-full justify-between items-center">
      <div class="flex space-x-4">
        <button class="font-semibold">Leki</button>
        <button class="font-semibold">Faktury</button>
        <button class="font-semibold">Klienci</button>
      </div>
      <button class="font-semibold">Wyloguj się</button>
    </nav> -->
    
    <div><RouterView /></div>
    <div class="fixed left-0 bottom-0">
      <RouterLink to="/">Home&nbsp;</RouterLink>
      <RouterLink to="/login">Login&nbsp;</RouterLink>
    </div>
  </div>
</template>