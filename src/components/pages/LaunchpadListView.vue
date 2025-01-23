<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const crowdsaleList = ref([]);
const loading = ref(true);
const error = ref(null);
import BuyPopup from "@/components/BuyPopup.vue";

const popupTrigger = ref(false);

const fetchCrowdsaleList = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/crowdsale');
    crowdsaleList.value = response.data;
  } catch (err) {
    error.value = 'Nie udało się pobrać danych';
    console.error(err);
  } finally {
    loading.value = false;
  }

  console.log(crowdsaleList.value);
};

const TogglePopup = () => {
  popupTrigger.value = !popupTrigger.value;
}

onMounted(() => {
  fetchCrowdsaleList();
});
</script>

<template>
  <div class="card">
    <h2>Launchpad list</h2>

    <!-- Obsługa ładowania i błędów -->
    <div v-if="loading">Ładowanie...</div>
    <div v-else-if="error">{{ error }}</div>

    <!-- Wyświetlanie listy -->
    <div class="card-body" v-else>
      <div class="crowdsale-list">
        <div class="crowdsale-row" v-for="crowdsale in crowdsaleList" :key="crowdsale.id">
          <img :src="crowdsale.token.logoURL" alt="icon" width="40px">
          <div class="token-info" >
            <div class="token-name">{{ crowdsale.token.name }}</div>
            <div class="token-symbol">{{ crowdsale.token.symbol }}</div>
            <div class="token-price">Price: {{ 1 / crowdsale.rate }} ETH</div>
          </div>
          <div class="buttons">
            <button>Info</button>
    <!--   TODO zrobic dialog boxa z detalami trasakcji         -->
            <button @click="TogglePopup()">Buy token</button>
            <BuyPopup v-if="popupTrigger" :TogglePopup="() => TogglePopup()" :crowdsale="crowdsale"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 50px auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--input-border-radius);
  width: 30%;
  padding: 20px;
}

@media (max-width: 800px) {
  .card {
    width: 90%;
  }
}

h2 {
  margin-bottom: 30px;
}

.card-body{
  width: 100%;
}

.crowdsale-row {
  width: 100%;
  display: flex;
  padding: 10px;
}

.crowdsale-row img {
  margin-right: 10px;
}

.buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.buttons button {
  background: var(--main-contrast-color-text);
  padding: 15px;
  border-radius: var(--input-border-radius);
  border: 1px solid var(--text-color-second);
}

</style>
