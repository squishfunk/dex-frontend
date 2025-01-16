require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_URL,
      // accounts: [ process.env.PRIVATE_KEY ]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: `${process.env.ETHERSCAN_API_KEY}`
    }
  }
};