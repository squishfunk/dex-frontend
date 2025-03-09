# DAPP Frontend

## Description
The DAPP application is designed as a decentralized web application (DApp) utilizing blockchain technology. The frontend is built using Vue.js and integrates with the MetaMask wallet. It allows users to create ERC-20 tokens and Crowdsale smart contracts.

## Technologies
- **Vue.js** – JavaScript framework for building the user interface.
- **Vuex** – state management.
- **Vue Router** – navigation between views.
- **Web3.js** – communication with the Ethereum blockchain.
- **MetaMask** – user wallet integration.
- **Solidity** – language for creating smart contracts.
- **Ethereum** – blockchain on which the application operates.

## Features
1. **MetaMask Integration**
   - User authentication via MetaMask.
   - Retrieving wallet address and ETH balance.

2. **Creating ERC-20 Tokens**
   - Form for configuring a new token (name, symbol, total supply, decimal places).
   - Deploying the contract on the Ethereum blockchain.
   - Storing the contract address within the application.

3. **Creating Crowdsale Smart Contracts**
   - Form for configuring a crowdsale campaign (token address, price, duration).
   - Deploying the Crowdsale smart contract.
   
4. **Managing Tokens and Crowdsales**
   - Displaying a list of created tokens.
   - Viewing details of Crowdsale campaigns.
   - Allowing users to purchase tokens.

## Installation & Running
```bash
git clone https://github.com/user/dapp-vue.git
cd dapp-vue
npm install
npm run serve
```

## MetaMask Configuration
1. Add an Ethereum test network (e.g., Goerli).
2. Import or create a new wallet.
3. Connect the application to MetaMask and grant the necessary permissions.

## Deploying Smart Contracts
1. Configure Web3 and MetaMask.
2. Deploy smart contracts using Solidity scripts.
3. Copy the contract addresses into the Vue application.

## Summary
The application allows users to easily create and manage ERC-20 tokens and Crowdsale campaigns on the Ethereum blockchain. With MetaMask integration, interacting with the blockchain is simple and intuitive.
