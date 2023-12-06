const hre = require('hardhat');



async function main() {
    const [owner, add1, add2] = await ethers.getSigners();
    const Ballot = await ethers.getContractFactory('Ballot2')
    const ballot = await Ballot.deploy();
    await ballot.waitForDeployment();
    console.log('Vote contract deployed to', ballot.target);

    const address = [owner.address, add1.address, add2.address];
    console.log(address);
    //const amount = { value: hre.ethers.utils.parseEther('1') };

    /**
     This will throw error that user is not admin
     const newBallot = await ballot.connect(add1).createBallot("Election for president", "Choose the next president of our organization", ["Candidate A", "Candidate B"], 5);
     console.log(newBallot)
     */

    //New Ballot create 
    const newBallot = await ballot.connect(owner).createBallot("Election for president", "Choose the next president of our organization", ["Candidate A", "Candidate B"], 5);
    //console.log(newBallot)
    //checking admin address [deployer or owner]
    const isAdmin = await ballot.connect(owner).admin()
    //console.log(isAdmin)
    //Getting ballots who's hasn't expired and  will show on dashboard
    const getActiveBallots = await ballot.connect(owner).getActiveBallots();
    //console.log(getActiveBallots);
    const vote = await ballot.connect(add1).vote(0, 1);
    console.log("Vote given by normal user", vote)
    const voteAdmin = await ballot.connect(owner).vote(0, 1);
    //Will Throw an error admin cannot vote
    console.log("Vote given by admin user", voteAdmin)
    const getBallotDetails = await ballot.connect(add1).getBallotDetails(0);
    console.log(getBallotDetails)
    const getWinner = await ballot.connect(add1).getWinner(0);
    //console.log(getWinner);


    // ballot.bellotDetails("Election for president", "Choose the next president of our organization", ["Candidate A", "Candidate B"])
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });



/**
 * contract deployed on localNetwork address  =  0x5FbDB2315678afecb367f032d93F642f64180aa3
 * ownder address = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
 * add1 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
 * add2 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
 */