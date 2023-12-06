// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot2 {
    address public admin;
    uint256 public ballotCount;

    struct BallotDetails {
        string title;
        string description;
        uint256 candidateCount;
        mapping(uint256 => Candidate) candidates;
        uint256 totalVotes;
        uint256 expirationTime; //Time in minutes
        mapping(address => bool) hasVoted;
    }

    struct Candidate {
        string name;
        uint256 votes;
    }

    mapping(uint256 => BallotDetails) public ballots;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier hasNotVoted(uint256 _ballotId) {
        require(!ballots[_ballotId].hasVoted[msg.sender], "You have already voted in this ballot");
        _;
    }

    modifier onlyNonAdmin() {
        require(msg.sender != admin, "Admins cannot vote");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createBallot(
        string memory _title,
        string memory _description,
        string[] memory _candidateNames,
        uint256 _expirationTimeInMinutes
    ) public onlyAdmin {
        uint256 ballotId = ballotCount;
        uint256 candidateCount = _candidateNames.length;
        uint256 expirationTime = block.timestamp + _expirationTimeInMinutes * 1 minutes; // Convert minutes to seconds

        ballots[ballotId].title = _title;
        ballots[ballotId].description = _description;
        ballots[ballotId].candidateCount = candidateCount;
        ballots[ballotId].expirationTime = expirationTime;

        for (uint256 i = 0; i < candidateCount; i++) {
            ballots[ballotId].candidates[i] = Candidate({
                name: _candidateNames[i],
                votes: 0
            });
        }

        ballotCount++;
    }

    function vote(uint256 _ballotId, uint256 _candidateIndex) public onlyNonAdmin hasNotVoted(_ballotId) {
        require(_ballotId < ballotCount, "Invalid ballot ID");
        BallotDetails storage details = ballots[_ballotId];
        require(block.timestamp < details.expirationTime, "Ballot has expired");
        require(_candidateIndex < details.candidateCount, "Invalid candidate index");

        details.candidates[_candidateIndex].votes++;
        details.totalVotes++;
        details.hasVoted[msg.sender] = true;
    }

    function getBallotDetails(uint256 _ballotId) public view returns (string memory, string memory, uint256, uint256, uint256,uint256, string[] memory, uint256[] memory) {
        BallotDetails storage details = ballots[_ballotId];
        string[] memory candidateNames = new string[](details.candidateCount);
        uint256[] memory candidateVotes = new uint256[](details.candidateCount);

        uint256 remainTime = details.expirationTime - block.timestamp;

        for (uint256 i = 0; i < details.candidateCount; i++) {
            candidateNames[i] = details.candidates[i].name;
            candidateVotes[i] = details.candidates[i].votes;
        }
        return (details.title, details.description, details.candidateCount, details.totalVotes, details.expirationTime, remainTime, candidateNames, candidateVotes);
    }


    function getActiveBallots() public view returns (uint256[] memory, string[] memory, string[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < ballotCount; i++) {
            if (block.timestamp < ballots[i].expirationTime) {
                activeCount++;
            }
        }

        uint256[] memory activeBallotIds = new uint256[](activeCount);
        string[] memory activeTitles = new string[](activeCount);
        string[] memory activeDescriptions = new string[](activeCount);

        uint256 currentIndex = 0;

        for (uint256 i = 0; i < ballotCount; i++) {
            if (block.timestamp < ballots[i].expirationTime) {
                activeBallotIds[currentIndex] = i;
                activeTitles[currentIndex] = ballots[i].title;
                activeDescriptions[currentIndex] = ballots[i].description;
                currentIndex++;
            }
        }

        return (activeBallotIds, activeTitles, activeDescriptions);
    }

    function getWinner(uint256 _ballotId) public view returns (string memory) {
        require(_ballotId < ballotCount, "Invalid ballot ID");
        BallotDetails storage details = ballots[_ballotId];
        require(block.timestamp >= details.expirationTime, "Ballot has not expired yet");

        uint256 maxVotes = 0;
        uint256 winningCandidateIndex = 0;
        bool isTie = false;

        for (uint256 i = 0; i < details.candidateCount; i++) {
            if (details.candidates[i].votes > maxVotes) {
                maxVotes = details.candidates[i].votes;
                winningCandidateIndex = i;
                isTie = false;
            } else if (details.candidates[i].votes == maxVotes) {
                isTie = true;
            }
        }

        if (isTie) {
            return "Tie";
        } else {
            return details.candidates[winningCandidateIndex].name;
        }
    }
}
