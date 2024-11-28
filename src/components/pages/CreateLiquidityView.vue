<script setup>
import axios from 'axios';
import { ref } from 'vue';
import {useEthereumStore} from "@/stores/ethereum.js";
import routerAbi from "@/assets/abi/UniswapV2Router02.json";
import tokenAbi from "@/assets/abi/ERC20.json";


const ethereumStore = useEthereumStore();


const tokenA = ref("");
const tokenB = ref("");
const amountA = ref("");
const amountB = ref("");
const message = ref("");


const web3 = ethereumStore.web3;
const routerAddress = "0xbcCB80D3953AEd07bcd7A74135fF83E7af8BF9F5"; // Adres Uniswap Router
const routerContract = new web3.eth.Contract(routerAbi, routerAddress);


const handleAddLiquidity = async () => {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    // Konwersja ilości do Wei
    const amountAInWei = web3.utils.toWei(amountA.value.toString(), "ether");
    const amountBInWei = web3.utils.toWei(amountB.value.toString(), "ether");

    // Zatwierdzenie tokenów dla routera
    const tokenAContract = new web3.eth.Contract(tokenAbi.abi, tokenA.value);
    const tokenBContract = new web3.eth.Contract(tokenAbi.abi, tokenB.value);

    await tokenAContract.methods
        .approve(routerAddress, amountAInWei)
        .send({ from: account });
    await tokenBContract.methods
        .approve(routerAddress, amountBInWei)
        .send({ from: account });

    // Dodanie płynności
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minut

    await routerContract.methods
        .addLiquidity(
            tokenA.value,
            tokenB.value,
            amountAInWei,
            amountBInWei,
            0,
            0,
            account,
            deadline
        )
        .send({ from: account });

    message.value = "Liquidity added successfully!";
  } catch (error) {
    console.log(error);
    message.value = `Error: ${error.message}`;
  }
};
</script>

<template>
  <div class="add-liquidity-form">
    <h2>Add Liquidity</h2>
    <form @submit.prevent="handleAddLiquidity">
      <div>
        <label for="tokenA">Token A</label>
        <input v-model="tokenA" placeholder="Token A Address" />
      </div>
      <div>
        <label for="tokenB">Token B</label>
        <input v-model="tokenB" placeholder="Token B Address" />
      </div>
      <div>
        <label for="amountA">Amount Token A</label>
        <input v-model="amountA" placeholder="Amount of Token A" />
      </div>
      <div>
        <label for="amountB">Amount Token B</label>
        <input v-model="amountB" placeholder="Amount of Token B" />
      </div>
      <button type="submit">Add Liquidity</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style>

.add-liquidity-form {
  max-width: 400px;
  margin: 100px auto 0;
}
</style>
