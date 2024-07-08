<script setup>
import Settings from "@/components/icons/Settings.vue";
import tokens from "../../assets/cryptocurrencies.json";
import {useEthereumStore} from "@/stores/ethereum.js";

/* TODO */
const ethereumStore = useEthereumStore();
</script>

<template>
  <div class="card">
    <div class="head">
      <div class="account-info">
        <img src="https://placehold.co/40x40" alt="">
        <div class="wallet-address">
          {{ ethereumStore.walletAddress }}

        </div>
      </div>
      <div class="head-buttons">
        <Settings />
      </div>
    </div>

    <div class="account-balance">
      {{ parseFloat(ethereumStore.balance).toFixed(5) }} ETH
    </div>

    <div class="token-list">
      <div class="token-row" v-for="token in tokens" @click="$emit('select-token', token)">
        <img :src="token.icon" alt="icon">
        <div class="token-info">
          <div class="token-name">{{ token.name }}</div>
          <div class="token-symbol">{{ token.symbol }}</div>
        </div>

      </div>
    </div>

  </div>
</template>


<style scoped>

.card {
  box-sizing: border-box; /* TODO czy to potrzebne? */
  padding: 20px;
  width: 100%;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
}

.account-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wallet-address {
  padding-left: 20px;
}

</style>