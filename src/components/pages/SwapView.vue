<script setup>
import {defineAsyncComponent, ref} from "vue";
// import Popup from "@/components/CurrencyPopup.vue";
import tokens from "../../assets/cryptocurrencies.json";
import Dropdown from "@/components/icons/Dropdown.vue";
import Change from "@/components/icons/Change.vue";
import routerAbi from "@/assets/abi/UniswapV2Router02.json";
import { useEthereumStore } from "@/stores/ethereum.js";
import { ethers } from "ethers";
import {toast} from "vue3-toastify";

const ethereumStore = useEthereumStore();
const web3 = ethereumStore.web3;
const routerAddress = "0xbcCB80D3953AEd07bcd7A74135fF83E7af8BF9F5"; // Adres Uniswap Router

const Popup = defineAsyncComponent(() =>
    import('@/components/CurrencyPopup.vue')
)

const baseValue = ref(0);
const targetValue = ref(0);
const rate = ref(0.5);

const tokenSelectPopup = ref({
    isVisible: false,
    from: null,
})

const selectedTokens = ref({
  base: {
    "name": "Ethereum",
    "symbol": "ETH",
    "icon": "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  target: {
    "name": "Wrapped Ethereum",
    "symbol": "wETH",
    "icon": "https://cryptologos.cc/logos/steth-steth-logo.png",
  },
})

const TogglePopup = (from) => {
  tokenSelectPopup.value.isVisible = !tokenSelectPopup.value.isVisible;
  tokenSelectPopup.value.from = from;
}

const calculateTargetValue = async () => {
   /* TODO */
	targetValue.value = baseValue.value * rate.value;
};

const selectToken = (token) => {
  if(tokenSelectPopup.value.from === 'base'){
    /* Jeśli wybieramy ten sam token co w przeciwnym inpucie */
    if(selectedTokens.value.target.symbol === token.symbol){
      selectedTokens.value.target = selectedTokens.value.base;
    }
    selectedTokens.value.base = token;
  }else if(tokenSelectPopup.value.from === 'target'){
    /* Jeśli wybieramy ten sam token co w przeciwnym inpucie */
    if(selectedTokens.value.base.symbol === token.symbol){
      selectedTokens.value.base = selectedTokens.value.target;
    }
    selectedTokens.value.target = token;
  }

  TogglePopup();
}

const changeSideSwap = () => {
  [selectedTokens.value.base, selectedTokens.value.target] = [selectedTokens.value.target, selectedTokens.value.base];
}

const performSwap = async () => {
  try {
    const routerContract = new web3.eth.Contract(routerAbi, routerAddress);
    const amountIn = ethers.parseUnits(baseValue.value.toString(), 18); // Kwota wejściowa w wei
    /* TODO zmień */
    const path = [
      "0x4d3ae197938004dc96ed640e54f726f1615bfc86",
      "0x81A5F578c184D4Eb33db206d3Ee949DcD10F3C3F",
    ];
    const to = await ethereumStore.account;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minut od teraz

    const amountsOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
    const amountOut = BigInt(amountsOut[1]);
    const amountOutMin = amountOut - (amountOut * BigInt(5)) / BigInt(100); // Obliczenie minimalnej kwoty z 5% poślizgu

    const tx = await routerContract.methods.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
    ).send({ from: to });

    console.log("Wymiana zakończona!", tx);
  } catch (error) {
    console.log(error);
    toast("Error during swap: " + error.message, {type: "error"})
  }
};


</script>

<template>
  <div class="card">

    <div class="controls">
      <div class="inputs">
        <div class="control">
          <input type="number" id="base-input" value="0" min="0" v-model="baseValue" @input="calculateTargetValue"/>
          <button id="base" @click="() => TogglePopup('base')" class="token-button">
            <img :src="selectedTokens.base.icon" alt="baseIcon" width="20px" height="20px">
            <div class="token-symbol">
              {{ selectedTokens.base.symbol }}
            </div>
            <Dropdown />
          </button>
        </div>
        <button class="change-direction" @click="changeSideSwap">
          <Change />
        </button>
        <div class="control">
          <input type="number" id="target-input" v-model="targetValue" min="0" readonly/>
          <button id="base" @click="() => TogglePopup('target')" class="token-button">
            <img :src="selectedTokens.target.icon" alt="baseIcon" width="20px" height="20px">
            <div class="token-symbol">
              {{ selectedTokens.target.symbol }}
            </div>
            <Dropdown />
          </button>
        </div>
      </div>
      <button class="swap-btn" @click="performSwap">
        Zamień
      </button>
    </div>
  </div>
  <Transition >
    <Popup @select-token="selectToken" :tokens="tokens" :TogglePopup="() => TogglePopup()" v-if="tokenSelectPopup.isVisible">
    </Popup>
  </Transition>
</template>

<style scoped>

.card{
  justify-content: center;
  align-items: center;
  /*background: var(--main-bg-color);*/
  border-radius: var(--input-border-radius);
  width: 100%;
  display: grid;
  gap: 30px;
  position: relative;
  padding: 30px;
}

button {
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.card h1 {
  text-align: center;
  color: var(--main-contrast-color-text);
}

.controls {
  display: grid;
  gap: 20px;
  position: relative;
}

.control {
  display: flex;
  background: var(--main-second-bg-color);
  border-radius: var(--input-border-radius);
  overflow: hidden;
  align-items: center;
  width: 100%;
}

.token-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--main-bg-color);
  margin-right: 25px;
  padding: 5px;
  border-radius: var(--input-border-radius);
  border: 1px solid var(--text-color-second);
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  position: relative;
}

.change-direction {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  align-items: center;
  position: absolute;
  background-color: var(--main-second-bg-color);
  border-radius: 50%;
  border: 3px solid var(--main-bg-color);
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
}

.control input {
  font-size:2rem;
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  padding: 30px 15px;
}

.control input::-webkit-inner-spin-button,
.control input::-webkit-outer-spin-button {
  appearance: none;

}

.swap-btn {
  background-color: var(--main-contrast-color);
  border-radius: var(--input-border-radius);
  color: var(--main-contrast-color-text);
  height: 5rem;
}

</style>