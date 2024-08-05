<template>
  <div class="card">
    <h1>Create ERC20 Token</h1>
    <form @submit.prevent="createToken">
      <div>
        <label for="name">Token Name:</label>
        <input type="text" v-model="tokenName" required />
      </div>
      <div>
        <label for="symbol">Token Symbol:</label>
        <input type="text" v-model="tokenSymbol" required />
      </div>
      <div>
        <label for="supply">Initial Supply:</label>
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
  const tokenSupply = ref(0);
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
.card{
  justify-content: center;
  border-radius: var(--input-border-radius);
  width: 75%;
  padding: 30px;
}

.card button {
  background-color: var(--main-contrast-color);
  border-radius: var(--input-border-radius);
  color: var(--main-contrast-color-text);
  height: 5rem;
  font-weight: 500;
  font-size: 1rem;
}
</style>
