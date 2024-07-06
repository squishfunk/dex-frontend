<script setup>
import {ref} from "vue";
import Popup from "@/components/CurrencyPopup.vue";
import tokens from "../../assets/cryptocurrencies.json";
import Dropdown from "@/components/icons/Dropdown.vue";


const baseValue = ref(0);
const targetValue = ref(0);
const rate = ref(0.5);

const tokenSelectPopup = ref({
    isVisible: false,
    from: null,
})

const selectedTokens = ref({
  base: {
    name: "Tether",
    symbol: 'USDT',
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  target: {
    name: "Bitcoin",
    symbol: 'BTC',
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
})

const TogglePopup = (from) => {
  tokenSelectPopup.value.isVisible = !tokenSelectPopup.value.isVisible;
  tokenSelectPopup.value.from = from;
}

const calculateTargetValue = () => {
   /* TODO */
	targetValue.value = baseValue.value * rate.value;
};

const selectToken = (token) => {
  if(tokenSelectPopup.value.from === 'base'){
    selectedTokens.value.base = token;
  }else if(tokenSelectPopup.value.from === 'target'){
    selectedTokens.value.target = token;
  }

  TogglePopup();
}

</script>

<template>
  <div class="card">

    <div class="controls">
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
      <button class="swap-btn">
        Zamień
      </button>
    </div>

    <div class="exchange-rate">
      test
    </div>
  </div>
  <Transition >
    <Popup @select-token="selectToken" :tokens="tokens" :TogglePopup="() => TogglePopup()" v-if="tokenSelectPopup.isVisible">
    </Popup>
  </Transition>
</template>

<style scoped>

.card{
  /*background: var(--main-bg-color);*/
  justify-content: center;
  border-radius: var(--input-border-radius);
  width: 75%;
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
  border: 1px solid var(--text-color-second);
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


.control input {
  font-size:2.5rem;
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 20px;
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
  font-weight: 500;
}

</style>