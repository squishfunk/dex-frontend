<script setup>
import axios from 'axios';
import { ref } from 'vue';
import {useEthereumStore} from "@/stores/ethereum.js";
import tokenContract from "../../../artifacts/contracts/NewERC20.sol/NewERC20.json";
import {toast} from "vue3-toastify";

const ethereumStore = useEthereumStore();

const token = ref({
  name: null,
  logoURL: null,
  symbol: null,
  supply: 21000000,
  description: null
});
const web3 = ethereumStore.web3;

const createToken = async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(tokenContract.abi);

  contract
      .deploy({
        data: tokenContract.bytecode,
        arguments: [token.value.name, token.value.symbol],
      })
      .send({ from: accounts[0] })
      .on('receipt', (receipt) => {
        const tokenData = {
          name: token.value.name,
          symbol: token.value.symbol,
          supply: 21000000,
          logoURL: token.value.logoURL,
          description: token.value.description,
          contractAddress: receipt.contractAddress,
          deployerAddress: accounts[0]
        };


        axios.post(
            'http://127.0.0.1:8000/api/tokens',
            tokenData
        ).then((response) => console.log(response))
            .catch(e => console.log(e));

        toast("Contract deployed at address: "+ receipt.contractAddress, {type: "success"})
      })
      .on('error', (error) => {
        toast("Error deploying contract: "+ error, {type: "error"})
      });
};

</script>

<template>
  <div class="card">
    <h2>Create ERC20 Token</h2>
    <form @submit.prevent="createToken">
      <div class="form-input">
        <label for="name">Token Name</label>
        <small>Your project name with spaces (usually 1-3 words)</small>
        <input placeholder="My token" type="text" v-model="token.name" required />
      </div>
      <div class="form-input">
        <label for="symbol">Token Symbol</label>
        <small>Ticker trading symbol (usually 3-5 letters)</small>
        <input placeholder="MYTKN" type="text" v-model="token.symbol" required />
      </div>
      <div class="form-input">
        <label for="symbol">Logo URL</label>
        <small>URL of 256x256 pixel PNG image of token logo with transparent background.</small>
        <input placeholder="https://..." type="text" v-model="token.logoURL"/>
      </div>
      <div class="form-input">
        <label for="supply">Initial Supply</label>
        <small>Number of initial tokens to mint </small>
        <input type="number" v-model="token.supply" required />
      </div>
      <div class="form-input">
        <label for="description">Description</label>
        <textarea placeholder="About our token" v-model="token.description" />
      </div>

      <button type="submit">Create Token</button>
    </form>
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

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

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

button {
  background-color: var(--main-contrast-color);
  border-radius: var(--input-border-radius);
  color: var(--main-contrast-color-text);
  height: 5rem;
  border: none;
}
</style>
