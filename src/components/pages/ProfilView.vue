<script setup>
import Settings from "@/components/icons/Settings.vue";
import tokens from "../../assets/cryptocurrencies.json";
import erc20ABI from "../../assets/erc20ABI.json";
import {useEthereumStore} from "@/stores/ethereum.js";
import {onMounted, ref} from "vue";

const ethereumStore = useEthereumStore();

const tokens_list = ref([]);

const getTokenData = async () => {

  let data = [];
  for (const token of tokens){
    let singleToken = [];
    singleToken = {
      "name": token.name,
      "symbol": token.symbol,
      "icon": token.icon,
      "address": token.address
    }
    singleToken.balance = 0;
    if(token.address){
      const contract = new ethereumStore.web3.eth.Contract(
          erc20ABI,
          token.address
      );

      let _balance = await contract.methods.balanceOf(ethereumStore.account).call();
      _balance = ethereumStore.web3.utils.fromWei(_balance, 'ether');

      singleToken.balance = _balance;
    }else{
      console.log(ethereumStore.balance);

      singleToken.balance = parseFloat(ethereumStore.balance).toFixed(3);
    }
    data.push(singleToken);
  }

  return data;
}

onMounted(async () => {
  tokens_list.value = await getTokenData();
})

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
      {{ parseFloat(ethereumStore.balance).toFixed(3) }} ETH
    </div>

    <div class="token-list">
      <div class="token-row" v-if="tokens_list" v-for="token in tokens_list" @click="$emit('select-token', token)">
        <img :src="token.icon" alt="icon">
        <div class="token-info" >
          <div class="token-name">{{ token.name }}</div>
          <div class="token-symbol">{{ parseFloat(token.balance).toFixed(3) }} {{ token.symbol}}</div>
        </div>
      </div>
      <div v-else>
        loading
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