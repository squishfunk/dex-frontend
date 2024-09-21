<script setup>
import Navbar from "@/components/Navbar.vue";
import 'vue3-toastify/dist/index.css';
</script>

<template>
	<Navbar />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100vh;
  width: 100%;
}
</style>
