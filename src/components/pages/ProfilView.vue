<script setup>
import Settings from "@/components/icons/Settings.vue";
// import tokens from "../../assets/cryptocurrencies.json";
import erc20 from "../../assets/abi/ERC20.json";
import {useEthereumStore} from "@/stores/ethereum.js";
import {onMounted, ref} from "vue";
import axios from "axios";

const ethereumStore = useEthereumStore();

const tokens_list = ref([]);

const API_URL = "http://localhost:8000/api/tokens";

const getTokenData = async () => {

  let data = [];

  const response = await axios.get(API_URL);
  const tokens = response.data;

  console.log(tokens);

  for (const token of tokens){
    let singleToken = [];
    singleToken = {
      "name": token.name,
      "symbol": token.symbol,
      "icon": token.logoURL,
      "address": token.address
    }
    singleToken.balance = 0;
    if(token.contractAddress){
      try{
        const contract = new ethereumStore.web3.eth.Contract(
            erc20.abi,
            token.contractAddress
        );

        let _balance = await contract.methods.balanceOf(ethereumStore.account).call();
        let _decimals = await contract.methods.decimals(ethereumStore.account).call();

        let balance_float = Number(_balance) / Math.pow(10, Number(_decimals));
        singleToken.balance = balance_float;

      }catch (e){
        console.error(e);
      }

    }else{
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
    <div class="card-head">
      <div class="account-info">
        <img src="https://placehold.co/40x40" alt="">
        <div class="wallet-info">
          <div class="wallet-address">
            {{ ethereumStore.walletAddress }}
          </div>
          <small class="account-balance">
            {{ parseFloat(ethereumStore.balance).toFixed(3) }} ETH
          </small>
        </div>
      </div>
      <div class="head-buttons">
        <Settings />
      </div>
    </div>

    <hr>

    <div class="card-body">
      <div class="token-list">
        <div class="token-row" v-if="tokens_list" v-for="token in tokens_list" @click="$emit('select-token', token)">
          <img :src="token.icon" alt="icon" width="40px">
          <div class="token-info" >
            <div class="token-name">{{ token.name }}</div>
            <div class="token-symbol">{{ token.balance }} {{ token.symbol}}</div>
          </div>
        </div>
        <div v-else>
          loading
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>

.card {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--input-border-radius);
  width: 90%;
  padding: 20px;
}

hr {
  align-self: stretch;
  margin: 10px 0 10px 0;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-body {
  padding: 10px;
  width: 100%;
  background-color: var(--main-second-bg-color);
  border-radius: var(--input-border-radius);
}

.account-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wallet-info {
  padding-left: 20px;

}
.token-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.token-row{
  display: flex;
  gap: 10px;
}

</style>