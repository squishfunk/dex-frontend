<template>
  <div class="card">
    <h1>Create ERC20 Token</h1>
    <form @submit.prevent="createToken">
      <div class="form-input">
        <label for="name">Token Name</label>
        <input type="text" v-model="tokenName" required />
      </div>
      <div class="form-input">
        <label for="symbol">Token Symbol</label>
        <input type="text" v-model="tokenSymbol" required />
      </div>
      <div class="form-input">
        <label for="supply">Initial Supply</label>
        <input type="number" v-model="tokenSupply" required />
      </div>
      <button type="submit">Create Token</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import {useEthereumStore} from "@/stores/ethereum.js";
  import tokenContract from "../../assets/ERC20.json";

  const ethereumStore = useEthereumStore();

  const tokenName = ref('');
  const tokenSymbol = ref('');
  const tokenSupply = ref(21000000);
  const web3 = ethereumStore.web3;

  const createToken = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(tokenContract.abi);
    const contract = new web3.eth.Contract(tokenContract.abi);

    contract
        .deploy({
          data: tokenContract.bytecode,
          arguments: [tokenName.value, tokenSymbol.value, tokenSupply.value],
        })
        .send({ from: accounts[0] })
        .on('receipt', (receipt) => {
          console.log('Contract deployed at address:', receipt.contractAddress);
        })
        .on('error', (error) => {
          console.error('Error deploying contract:', error);
        });
  };

</script>

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

h1 {
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
}

.form-input label {
  margin: 10px;
}

input {
  box-sizing: border-box;
  font-size:2rem;
  background: transparent;
  width: 100%;
  border: 1px var(--main-bg-color-hover) solid;
  border-radius: var(--input-border-radius);
  outline: none;
  padding: 10px 10px;
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
