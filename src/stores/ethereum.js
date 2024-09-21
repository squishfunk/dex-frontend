import { defineStore } from 'pinia';
import erc20 from "../assets/ERC20.json";

import Web3 from 'web3';
import {onMounted} from "vue";
import {toast} from "vue3-toastify";

export const useEthereumStore = defineStore('ethereum', {
    state: () => ({
        web3: null,
        account: null,
        balance: null,
        networkId: null,
    }),
    getters: {
        walletAddress: (state) => state.account.substring(0,6) + '...' + state.account.substring(state.account.length - 4)
    },
    actions: {
        async connect() {
            try {
                if (window.ethereum) {
                    this.web3 = new Web3(window.ethereum);

                    // Call private method to switch to the sepolia test network
                    await this._switchToSepolia();

                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const networkId = await this.web3.eth.net.getId();
                    this.networkId = networkId;

                    if (networkId !== 11155111n) {
                        toast("Please connect to the Rinkeby test network." , {type: "error"});
                        return;
                    }

                    const accounts = await this.web3.eth.getAccounts();
                    this.account = accounts[0];

                    const balance = await this.web3.eth.getBalance(this.account);
                    this.balance = this.web3.utils.fromWei(balance, 'ether');
                } else {
                    toast("No Ethereum provider found. Install MetaMask." , {type: "error"});
                }
            } catch (error) {
                toast("Error connecting to Ethereum provider: " + error.message , {type: "error"});
            }
        },
        // Private method to switch to the Sepolia test network
        async _switchToSepolia() {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0xaa36a7',
                                    chainName: 'Sepolia Test Network',
                                    rpcUrls: ['https://rpc2.sepolia.org'], /* Replace with your RPC URL */
                                    nativeCurrency: {
                                        name: 'Sepolia Ether',
                                        symbol: 'ETH',
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ['https://sepolia.etherscan.io'],
                                },
                            ],
                        });
                    } catch (addError) {
                        toast("Failed to add the Sepolia network to MetaMask: " + addError.message , {type: "error"});
                        throw addError;
                    }
                } else {
                    toast("Failed to switch to the Sepolia network: " + switchError.message , {type: "error"});
                    throw switchError;
                }
            }
        },
        async getTokenBalance(tokenAddress) {
            try {
                const tokenContract = new this.web3.eth.Contract(erc20.abi, tokenAddress);
                const balance = await tokenContract.methods.balanceOf(this.account).call();
                return this.web3.utils.fromWei(balance, 'ether'); // Assuming the token has 18 decimals
            } catch (error) {
                console.error("Error fetching token balance:", error);
                throw error;
            }
        }
    },
});
