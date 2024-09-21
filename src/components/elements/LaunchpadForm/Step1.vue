<script setup>
import {toast} from "vue3-toastify";
import {useDebounceFn} from "@vueuse/core";

const { token } = defineProps({token: Object})

import erc20 from "@/assets/ERC20.json";
import {useEthereumStore} from "@/stores/ethereum.js";

const ethereumStore = useEthereumStore();

const getTokenInfo = useDebounceFn(async (e) => {
  console.log(token.isLoading);
  token.isLoading = true;

  try{
    const contract = new ethereumStore.web3.eth.Contract(
        erc20.abi,
        e.target.value
    );
    token.name = await contract.methods.name().call();
    token.symbol = await contract.methods.symbol().call();
    token.decimals = await contract.methods.decimals().call();
  }catch (e){
    toast("Token has not been found", {type: "error"})
    token.name = null;
    token.symbol = null;
    token.decimals = 21000000;
    token.isLoading = false;
  }

  token.isLoading = false;


  /* 0xd62F783B767287A3A37FeBC9dADe7525b819138a */
}, 500);

</script>

<template>
  <div class="form-input">
    <label for="name">Token Contract Address</label>
    <input placeholder="0x..." type="text" required @input="getTokenInfo" />
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
</style>