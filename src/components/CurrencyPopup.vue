<script setup>
import Close from "@/components/icons/Close.vue";

const props = defineProps(['TogglePopup', 'tokens'])

const selectToken = (token) => {
    console.log(token);
}

</script>

<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="top-popup">
        Wybierz Token
        <Close class="popup-close" @click="TogglePopup()">
          Close Popup
        </Close>
      </div>

      <div class="token-list">
        <div class="token-row" v-for="token in tokens" @click="$emit('select-token', token)">
          <img :src="token.icon" alt="icon">
          <div class="token-info">
            <div class="token-name">{{ token.name }}</div>
            <div class="token-symbol">{{ token.symbol }}</div>
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
  z-index: 1000;
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
  overflow: scroll;
  width: 100%;
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