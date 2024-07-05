<script setup>
import Web3 from 'web3';

import Menu from "@/components/icons/Menu.vue";
import Close from "@/components/icons/Close.vue";
import {ref} from "vue";

const isMenuEnabled = ref(false);

function toggleMenu() {
	isMenuEnabled.value = !isMenuEnabled.value;
}


const web3 = ref(null);
const account = ref(null);
async function connectWallet(){
	if (window.ethereum) {
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			account.value = accounts[0];

			web3.value = new Web3(window.ethereum);

			console.log(web3.value);
			console.log(account.value);

		} catch (error) {
			console.error("Użytkownik odmówił połączenia", error);
		}
	} else {
		alert('Metamask is not available');
	}
}
</script>

<template>
	<nav>
		<ul class="sidebar" v-if="isMenuEnabled">
			<li>
				<a href="#" @click="toggleMenu"><Close/></a>
			</li>
			<li>
				<a href="#">DEX</a>
			</li>
			<li>
				<a href="#">Swap</a>
			</li>
			<li>
				<a href="#">Launchpool</a>
			</li>
			<li>
				<a href="#" @click="connectWallet">{{ account ? `Connected with: ${account.substring(0, 100)}` : "Connect metamask" }}</a>
			</li>
		</ul>

		<ul>
			<li>
				<a id="Logo" href="#">DEX</a>
			</li>
			<li class="hideOnMobile">
				<a href="#">Swap</a>
			</li>
			<li class="hideOnMobile">
				<a href="#">Launchpool</a>
			</li>
			<li class="hideOnMobile">
				<a href="#" @click="connectWallet">{{ account ? account : "Connect metamask" }}</a>
			</li>
			<li class="menu-button">
				<a href="#" @click="toggleMenu"><Menu/></a>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
nav {
	background-color: white;
	box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
}

nav ul{
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
	color: black;
	text-decoration: none;
	display: flex;
	align-items: center;
}

nav a:hover{
	background-color: #f0f0f0;
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

.menu-button {
	display: none;
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
