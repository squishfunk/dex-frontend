<script setup>
import Close from "@/components/icons/Close.vue";
import {computed, ref} from "vue";
import crowdsaleContractArtifact from "../../artifacts/contracts/Crowdsale.sol/Crowdsale.json";
import {toast} from "vue3-toastify";
import {useEthereumStore} from "@/stores/ethereum.js";
const ethereumStore = useEthereumStore();

const props = defineProps(['TogglePopup', 'crowdsale'])

const amount = ref(0);

const priceInEth = computed(() => (amount.value / props.crowdsale.rate).toFixed(5));

const buyToken = async (contractAddress) => {
  try{

    const contract = new ethereumStore.web3.eth.Contract(
        crowdsaleContractArtifact.abi,
        contractAddress
    );

    let response = await contract.methods.buyTokens(ethereumStore.account).send({
      from: ethereumStore.account,
      value: ethereumStore.web3.utils.toWei(priceInEth.value, 'ether'),
    });

    console.log(response);
  }catch (e){
    console.log(e);
    toast(e.message, {type: "error"})
  }
}
</script>

<template>
  <div class="popup" @click="TogglePopup()">
    <div class="popup-inner" @click.stop="">
      <div class="top-popup">
        Buy token
        <Close class="popup-close" @click="TogglePopup()" />
      </div>

      <div class="token-list">
        <div class="token-row">
          <img :src="crowdsale.token.logoURL" alt="icon">
            <div class="token-name">{{ crowdsale.token.name }}</div>
            <div class="token-symbol">{{ crowdsale.token.symbol }}</div>
        </div>
        
        <div class="buy-form">
          <input type="text" placeholder="Amount" v-model.number="amount">
        </div>

        <div class="summary">
          <small>Cost: {{ priceInEth }} ETH</small>
          <button @click="buyToken(crowdsale.contractAddress)">Buy</button>
        </div>
        <div class="form-div">

        </div>
      </div>

    </div>
  </div>
</template>


<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: rgba(0,0,0,0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.popup-inner {
  background: var(--main-bg-color);
  width: 80%;
  border-radius: var(--input-border-radius);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  max-height: 60%;
}

.top-popup {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.token-list {
  overflow-y: scroll;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.token-list::-webkit-scrollbar {
  display: none;
}

.token-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
}


.token-row img {
  width: 40px;
  background: transparent;
}

.popup-close {
  cursor: pointer;
}

input {
  box-sizing: border-box;
  background: transparent;
  width: 100%;
  border: 1px var(--main-bg-color-hover) solid;
  border-radius: var(--input-border-radius);
  outline: none;
  padding: 10px 10px;
}

.summary{
  margin-top: 15px;
}

button {
  background: var(--main-contrast-color-text);
  padding: 15px;
  border-radius: var(--input-border-radius);
  border: 1px solid var(--text-color-second);
  width: 100%;
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>