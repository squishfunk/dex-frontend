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
  display: flex;
  height: 100vh;
  width: 100%;
}
</style>
