import { defineStore } from 'pinia';
import Web3 from 'web3';

export const useEthereumStore = defineStore('ethereum', {
    state: () => ({
        web3: null,
        account: null,
        balance: null,
    }),
    getters: {
        walletAddress: (state) => state.account.substring(0,6) + '...' + state.account.substring(state.account.length - 4)
    },
    actions: {
        async connect() {
            try {
                if (window.ethereum) {
                    this.web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await this.web3.eth.getAccounts();
                    this.account = accounts[0];

                    const balance = await this.web3.eth.getBalance(this.account);
                    this.balance = this.web3.utils.fromWei(balance, 'ether');

                    await this.getBalance();
                } else {
                    console.error("No Ethereum provider found. Install MetaMask.");
                }
            } catch (error) {
                console.error("Error connecting to Ethereum provider:", error);
            }
        }
    },
});
