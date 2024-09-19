<script setup>

import MenuIcon from "@/components/icons/Menu.vue";
import CloseIcon from "@/components/icons/Close.vue";
import {computed, ref} from "vue";
import ThemeSwitch from "@/components/elements/ThemeSwitch.vue";
import Logo from "@/components/icons/Logo.vue";
import { useEthereumStore } from "@/stores/ethereum.js";

const isMenuEnabled = ref(false);

function toggleMenu() {
	isMenuEnabled.value = !isMenuEnabled.value;
}

const ethereumStore = useEthereumStore();

const connectWallet = async () => {
  await ethereumStore.connect();
};

const account = computed(() => ethereumStore.account);

</script>

<template>
	<nav>
		<ul class="sidebar" v-if="isMenuEnabled">
			<li>
				<a href="#" @click="toggleMenu"><CloseIcon/></a>
			</li>
			<li>
        <RouterLink to="/">Swap</RouterLink>
			</li>
			<li>
        <RouterLink to="/token/mint">Token minter</RouterLink>
			</li>
      <li>
        <RouterLink to="/token/launchpad">Launchpad</RouterLink>
      </li>
			<li>
        <template v-if="account">
          <RouterLink to="/profile">{{ ethereumStore.walletAddress }}</RouterLink>
        </template>
        <template v-else>
          <a href="#" @click="connectWallet">Connect metamask</a>
        </template>
      </li>
      <li>
        <ThemeSwitch/>
      </li>
		</ul>
		<ul>
			<li>
				<RouterLink class="logo" to="/"><Logo/></RouterLink>
			</li>
			<li class="hideOnMobile">
				<RouterLink to="/">Swap</RouterLink>
			</li>
			<li class="hideOnMobile">
        <RouterLink to="/token/mint">Token minter</RouterLink>
			</li>
			<li class="hideOnMobile">
        <template v-if="account">
          <RouterLink to="/profile">{{ ethereumStore.walletAddress }}</RouterLink>
        </template>
        <template v-else>
          <a href="#" @click="connectWallet">Connect metamask</a>
        </template>
			</li>
      <li class="hideOnMobile">
        <div class="switch-control">
          <ThemeSwitch/>
        </div>
      </li>
			<li class="menu-button">
				<a href="#" @click="toggleMenu"><MenuIcon/></a>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
.logo {
  fill: var(--main-contrast-color-text);
  width: 30px;
}

.logo svg {
  fill: var(--main-contrast-color-text);
}


nav {
	background-color: var(--main-bg-color);
	box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  z-index: 1001;
  display: flex;
  justify-content: center;
}

nav ul{
  max-width: 1000px;
	width: 100%;
	list-style: none;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

nav li {
	height: 3rem;
}

nav a{
	height: 100%;
	padding: 0 30px;
	color: var(--text-color);
	text-decoration: none;
	display: flex;
	align-items: center;
}

nav a:hover{
	background-color: var(--main-bg-color-hover);
}

nav li:first-child {
	margin-right: auto;
}

.sidebar {
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 250px;
	z-index: 999;
	background-color: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	box-shadow: -10px 0 10px rgba(0,0,0,0.2);
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	display: flex;
}

.sidebar li {
	width: 100%;
}

.sidebar a {
	width: 100%;
}

.sidebar li:last-child{
  margin-top: auto;
}

.menu-button {
	display: none;
}

.switch-control {
  display: flex;
  align-items: center;
  height: 100%;
}

@media (max-width: 800px) {
	.hideOnMobile {
		display: none;
	}

	.menu-button {
		display: block;
	}
}


</style>
