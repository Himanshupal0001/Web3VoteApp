// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
//const { ethers } = require('hardhat')
require('dotenv').config()
async function main() {
  const Ballot = await ethers.getContractFactory('Ballot2')
  const ballot = await Ballot.deploy();
  await ballot.waitForDeployment();
  console.log('Vote contract deployed to', ballot.target);

  //await ballot.deployed();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


//within main function
/**
const [admin, from1, from2, from3] = await hre.ethers.getSigners();
  const ballot = await hre.ethers.getContractfactory('ballot');
  const contract = await ballot.deploy();
  await contract.deployed();
  console.log('Add of contract', contract.address);

  const address = [admin.address, from1.address]
  console.log(address)
  const amount = { value: hre.ethers.utils.parseEther('1') }
  await contract.connect(admin).createBallot("Election for president", "Choose the next president of our organization", ["Candidate A", "Candidate B"])
 */


/**
async function getBalance(address) {
const balanceBigInt = await hre.ethers.provider.getBalance(address);
return hre.ethers.utils.formatEther(balanceBigInt);
}
async function consoleBalance(addresses) {
let counter = 0;
for (const address of addresses) {
  console.log(`Address ${counter} balance`, await getBalance(address))
}
}


async function consoleBallot(ballots) {
for (const ballot of ballots) {
  const title = ballot.title;
  const desc = ballot.description;
  const candCount = ballot.candidateCount;
  console.log(title, desc, candCount)
}
}
 */
