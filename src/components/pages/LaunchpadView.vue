<script setup>
import { ref } from 'vue';
import {useEthereumStore} from "@/stores/ethereum.js";
import erc20 from "@/assets/ERC20.json";

const ethereumStore = useEthereumStore();

const token = ref({
  name: null,
  symbol: null,
  decimals: 21000000,
  isLoading: false
});

const getTokenInfo = async (e) => {
  token.value.isLoading = true;

  try{
    const contract = new ethereumStore.web3.eth.Contract(
        erc20.abi,
        e.target.value
    );
    token.value.name = await contract.methods.name().call();
    token.value.symbol = await contract.methods.symbol().call();
    token.value.decimals = await contract.methods.decimals().call();
  }catch (e){
    token.value = {
      name: null,
      symbol: null,
      decimals: 21000000,
      isLoading: false
    };
  }

  token.value.isLoading = false;


  /* 0xd62F783B767287A3A37FeBC9dADe7525b819138a */
}


</script>

<template>
  <div class="card">
    <h2>Create Token Launchpad</h2>
    <form>
      <div class="form-input">
        <label for="name">Token Contract Address</label>
        <input placeholder="My token" type="text" required @input="getTokenInfo" />
        <table v-if="!token.isLoading && token.name">
          <tr>
            <td>
              Token name
            </td>
            <td>
              {{ token.name }}
            </td>
          </tr>
          <tr>
            <td>
              Token symbol
            </td>
            <td>
              {{ token.symbol }}
            </td>
          </tr>
          <tr>
            <td>
              Decimals
            </td>
            <td>
              {{ token.decimals }}
            </td>
          </tr>
        </table>
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
