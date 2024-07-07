<script setup>
import Close from "@/components/icons/Close.vue";
import tokens from "../../assets/cryptocurrencies.json";

/* TODO */
const account = 'asdasdad';
</script>

<template>
  <div class="card">
    <div class="head">
      <div class="account-info">
        {{ account }}
      </div>
      <div class="head-buttons">

      </div>
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


<style>

.card {
  width: 100%;
}

</style>