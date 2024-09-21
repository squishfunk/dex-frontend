<script setup>
import {ref, watch} from 'vue';
import Step1 from './Step1.vue';
// import Step2 from './Step2.vue';
// import Step3 from './Step3.vue';

const currentStep = ref(1);
const token = ref({
  name: null,
  symbol: null,
  decimals: 21000000,
  isLoading: false
});

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value += 1;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value -= 1;
};

const submitForm = () => {
  console.log('Submitting form:', formData.value);
};


</script>

<template>
    <div class="form">





      <div v-if="currentStep === 1">
        <Step1 :token="token" />
      </div>
      <div v-if="currentStep === 2">
        <Step2 :token="token" />
      </div>
  <!--    <div v-if="currentStep === 3">-->
  <!--      <Step3 :formData="formData" />-->
  <!--    </div>-->

      <div class="navigation">
        <button v-if="currentStep > 1" @click="prevStep">Previous</button>
        <button v-if="!token.isLoading && token.name" @click="nextStep">Next step</button>
        <button v-if="currentStep === 3" @click="submitForm">Submit</button>
      </div>
    </div>
</template>

<style scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

.navigation {
  display: flex;
  gap: 10px;
}

button {
  background-color: var(--main-contrast-color);
  border-radius: var(--input-border-radius);
  color: var(--main-contrast-color-text);
  height: 5rem;
  border: none;
  width: 100%;
}
</style>
