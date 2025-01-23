<script setup>
import {toast} from "vue3-toastify";
import '@vuepic/vue-datepicker/dist/main.css';

import crowdsaleContractArtifact from "../../../../artifacts/contracts/Crowdsale.sol/Crowdsale.json";

const { token } = defineProps({token: Object})

import {useEthereumStore} from "@/stores/ethereum.js";
import {ref} from "vue";
import axios from "axios";

const ethereumStore = useEthereumStore();
const rate = ref(0);
const wallet = ref("");
const openingTime = ref("");
const closingTime = ref("");
const deploymentResult = ref("");


const deployCrowdsale = async () => {
  try {
    const web3 = ethereumStore.web3;
    const accounts = await web3.eth.getAccounts();

    const fromAccount = accounts[0];
    /* TODO DODAC OPCJE MINTOWANIA TOKENA NA SMARTKONTRAKCIE!!!!!!!!!!!!!!! */
    // Kontrakt Crowdsale ABI i bytecode
    const timedCrowdsaleBytecode = crowdsaleContractArtifact.bytecode;

    const crowdsaleContract = new web3.eth.Contract([crowdsaleContractArtifact.abi]);

    // Konwersja dat na timestamp
    const openingTimestamp = new Date(openingTime.value).getTime() / 1000;
    const closingTimestamp = new Date(closingTime.value).getTime() / 1000;

    // Parametry kontraktu
    const constructorArgs = [
      rate.value,          // rate: tokens per ETH
      wallet.value,        // wallet address
      token.address  // token address
    ];

    // Wysłanie transakcji do blockchain
    const deployedContract = await crowdsaleContract
        .deploy({
          data: timedCrowdsaleBytecode,
          arguments: constructorArgs,
        })
        .send({ from: fromAccount });

    const crowdsaleData = {
      rate: rate.value,
      deployerAddress: wallet.value,
      contractAddress: deployedContract.options.address,
      tokenAddress: token.address,
    };

    const response = await axios.post("http://127.0.0.1:8000/api/crowdsale", crowdsaleData);
    // response.data;

    // Zapisanie adresu nowego kontraktu
    toast("Contract deployed at address: "+ deployedContract.options.address, {type: "success"})
    deploymentResult.value = deployedContract.options.address;
    token.crowdsaleAddress = deployedContract.options.address;
  } catch (error) {

    toast("Deployment error: "+ error, {type: "error"})
    console.error("Deployment error:", error);
  }
};

const setDefaultWallet = (e) => {
  e.preventDefault;
  wallet.value = ethereumStore.account;
}

</script>

<template>
  <div class="form-input">
    <form @submit.prevent="deployCrowdsale">
      <div class="form-group">
        <label for="rate">Rate (tokens per ETH)</label>
        <input
            id="rate"
            v-model.number="rate"
            type="number"
            placeholder="Enter rate"
            required
        />
      </div>

      <div class="form-group">
        <label for="wallet">Wallet Address</label>
        <input
            id="wallet"
            v-model="wallet"
            type="text"
            placeholder="Enter wallet address"
            required
        />
        <a @click="setDefaultWallet" href="#">Set my wallet address</a>
      </div>

<!--      <div class="form-group">-->
<!--        <label for="openingTime">Opening Time (UTC)</label>-->
<!--        <input-->
<!--            id="openingTime"-->
<!--            v-model="openingTime"-->
<!--            type="datetime-local"-->
<!--            required-->
<!--        />-->
<!--      </div>-->

<!--      <div class="form-group">-->
<!--        <label for="closingTime">Closing Time (UTC)</label>-->
<!--        <input-->
<!--            id="closingTime"-->
<!--            v-model="closingTime"-->
<!--            type="datetime-local"-->
<!--            required-->
<!--        />-->
<!--      </div>-->

      <button type="submit">Deploy crowdsale contract</button>
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