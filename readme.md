## Web3 Voting app 
This app is built using solidity, blockchain, and React. RPC url is provided by Alchemy. This app is  an attempt to understand the basics of blockchain and create products around the ecosystem.

## Demo Link 💻
A live demo of the application is avaiablable at 👉 [Web3 Voteapp live link](https://65704bac8634915ac893c887--peppy-gingersnap-f6699a.netlify.app/)

## Tech Stack ⚙

 - React
 - Redux toolkit
 - Tailwind Css
 - Soliity 
 - Blockchain
 - Hardhat

## Getting Started 🍕
To spin the app on local machine follow below steps
***Backend  Part in web3/web3 directory***
 - Clone both the Repository in a folder name web3.
 - install the dependency using command npm i or npm install
 - Create an account in [Alchemy](https://www.alchemy.com/)
 - Create an account in [Metamask](https://metamask.io/)
 - Create a new app in Alchemy and get the url.
 - Go to web3/web3
 - Store metamask private key and Alchemy url in .env file.
 - Go to hardhat config and set the env values there.
 - Compile the sol file using **npx hardhat compile** command.
 - Test the compiled file on hardhat local node using command  **npx hardhat run .scripts/testDeploy.js**
 - After successful test run deploy the contract on blockchain network using command **npx hardhat run --network sepolia scripts/deploy.js** .

> Make sure to copy paste the contract address after running the above command

. 
***Frontend part in web3/client directory***
 - Copy the **Ballot2.json**  file from ***web3/web3/artifacts/contracts/Vote2.sol/Ballot2.json***
 - Go to client directory web3/client
 - In the src folder create a folder contract and paste the Ballot.json file in file name Ballot.json
 - Replace the wallet address from your metamask wallet address in constant.js file
 - Run command **npm start**.
 - Test the frontend. 
## Addressing Bugs
 - Create ballot issue : When click on add more handleSubmit() function triggers.
 - Feature pending: Winner function pending
 - Vote functioanlity not tested.
