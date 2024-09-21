<script setup>
import MultiStepForm from "@/components/elements/LaunchpadForm/MultiStepForm.vue";

</script>

<template>
  <div class="card">
    <h2>Create Token Launchpad</h2>
    <MultiStepForm />
  </div>
</template>

<style scoped>
.card {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--input-border-radius);
  width: 100%;
  padding: 20px;
}

h2 {
  margin-bottom: 30px;
}
</style>
