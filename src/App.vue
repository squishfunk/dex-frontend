<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
	<Navbar />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: grid;
  place-items: center;
  min-height: 100vh; /* TODO */
}
</style>
