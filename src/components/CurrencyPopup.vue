<script setup>
import Close from "@/components/icons/Close.vue";
import {computed, ref, watchEffect} from "vue";
import axios from "axios";

const props = defineProps(['TogglePopup', 'tokens'])

const searchQuery = ref("");
const fetchedTokens = ref([]);

const filteredTokens = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.tokens;
  }
  console.log('XDDD');
  const query = searchQuery.value.toLowerCase();
  return props.tokens.filter(token =>
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query)
  );
});

watchEffect(async () => {
  /* Jeśli nie ma wyniku robimy request do api */
  if (searchQuery.value.trim() && filteredTokens.value.length === 0) {

    /* TODO REQUEST */
    // try {
    //   const response = await axios.get("http://localhost/tokens", {
    //     params: { q: searchQuery.value.trim() }
    //   });
    //   fetchedTokens.value = response.data;
    // } catch (error) {
    //   console.error("Błąd podczas pobierania tokenów:", error);
    // }
  }
});

</script>

<template>
  <div class="popup" @click="TogglePopup()">
    <div class="popup-inner" @click.stop="">
      <div class="top-popup">
        Wybierz Token
        <Close class="popup-close" @click="TogglePopup()" />
      </div>

      <div class="token-list">
        <div class="token-row" v-for="token in filteredTokens" @click="$emit('select-token', token)">
          <img :src="token.icon" alt="icon">
          <div class="token-info">
            <div class="token-name">{{ token.name }}</div>
            <div class="token-symbol">{{ token.symbol }}</div>
          </div>
        </div>
        <div class="search-row">
          <div class="token-info">
            <div class="token-symbol">
              <input type="text" v-model="searchQuery" placeholder="Search for token" >
            </div>
          </div>

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

.token-row .token-info {
  display: flex;
  flex-direction: column;
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