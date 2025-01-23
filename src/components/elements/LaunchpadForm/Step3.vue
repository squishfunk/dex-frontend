<script setup>
import {toast} from "vue3-toastify";
import '@vuepic/vue-datepicker/dist/main.css';

import crowdsaleContractArtifact from "../../../../artifacts/contracts/Crowdsale.sol/Crowdsale.json";

const { token } = defineProps({token: Object})

import {useEthereumStore} from "@/stores/ethereum.js";
import {ref} from "vue";
import axios from "axios";
import tokenAbi from "@/assets/abi/ERC20.json";

const ethereumStore = useEthereumStore();
const supplyToSend = ref(0);

const maxSupply = Number(token.totalSupply / BigInt(10**18));

const deployTokensOnContract = async () => {
  try {
    const web3 = ethereumStore.web3;
    const accounts = await web3.eth.getAccounts();

    const fromAccount = accounts[0];

    const tokenContract = new web3.eth.Contract(tokenAbi.abi, token.address);

    await tokenContract.methods.transfer(token.crowdsaleAddress, web3.utils.toWei(supplyToSend.value, "ether")).send({from: fromAccount});

    toast("Tokens successfully sent to the contract address.", {type: "success"});
  } catch (error) {

    toast("Tokens cannot be sent error: " + error, {type: "error"})
    console.error("Deployment error:", error);
  }
}

console.log(token);

</script>

<template>
  <div class="form-input">
    <form @submit.prevent="deployTokensOnContract">
      <div class="form-group">
        <label for="rate">Amount of tokens to crowdsale</label>
        <input
            id="rate"
            v-model.number="rate"
            v-model="supplyToSend"
            type="range"
            :max="maxSupply"
            required
        />
        {{supplyToSend}}
      </div>
      <button type="submit">Deploy tokens to contract</button>
    </form>
  </div>
</template>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input label {
  font-weight: 900;
}

.form-input small {
  font-weight: 100;
}

.form-input input {
  box-sizing: border-box;
  background: transparent;
  width: 100%;
  border: 1px var(--main-bg-color-hover) solid;
  border-radius: var(--input-border-radius);
  outline: none;
  padding: 10px 10px;
}

.form-input textarea {
  box-sizing: border-box;
  background: transparent;
  width: 100%;
  border: 1px var(--main-bg-color-hover) solid;
  border-radius: var(--input-border-radius);
  outline: none;
  padding: 10px 10px;
  height: 200px;
}

input:focus {
  border: 1px var(--main-color) solid;
}

.form-group {
  margin: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>