<script>
export default {
  name: "SwapView"
}
</script>

<template>
  <div class="card">
    <h1>SWAP</h1>

    <div class="controls">
      <div class="control">
        <button id="base">USD</button>
        <input type="number" id="base-input" value="0" min="0" />
      </div>
      <div class="control">
        <button id="target">EUR</button>
        <input type="number" id="target-input" value="0" min="0" readonly/>
      </div>
      <button class="swap-btn">swap</button>
    </div>

    <div class="exchange-rate">
      test
    </div>
  </div>
</template>

<style scoped>

.card{
  background: white;
  box-shadow: 25px 25px 25px var(--shadow-1);
  justify-content: center;
  border-radius: 10px;
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
  color: var(--main-color);
}

.controls {
  display: grid;
  gap: 20px;
  position: relative;
}

.control {
  display: flex;
  background: var(--input-color); /* Inny */
  box-shadow: 10px 10px 3px var(--main-bg-color);
  border-radius: 10px;
  overflow: hidden;
}

.control button {
  --image: url(https://placehold.co/30/teal/white?text=$);
  font-weight: 600;
  background: transparent;
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control button::before {
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: teal var(--image) center no-repeat;
}

.control input {
  font-size:2.5rem;
  text-align: end;
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

</style>