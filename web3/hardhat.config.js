require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
SEPOLIA_URL = process.env.SEPOLIA_URL
SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY
METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [METAMASK_PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey: SEPOLIA_API_KEY
  },
  sourcify:{
    enabled: true
  }
};
