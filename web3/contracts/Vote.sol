// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot {
    struct Candidate {
        string name;
        uint256 votes;
    }

    struct BallotDetails {
        string title;
        string description;
        mapping(uint256 => Candidate) candidates;
        uint256 candidateCount;
        mapping(address => bool) hasVoted;
        uint256 totalVotes;
    }

    struct BallotSummary {
        string title;
        string description;
        uint256 candidateCount;
        uint256 totalVotes;
    }

    address public admin;
    mapping(uint256 => BallotDetails) public ballots;
    uint256 public ballotCount;

    event BallotCreated(uint256 indexed ballotId, string title);
    event Voted(uint256 indexed ballotId, address indexed voter, uint256 candidateIndex);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    modifier ballotExists(uint256 _ballotId) {
        require(_ballotId < ballotCount, "Ballot does not exist");
        _;
    }

    modifier hasNotVoted(uint256 _ballotId) {
        require(!ballots[_ballotId].hasVoted[msg.sender], "Already voted");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createBallot(
        string memory _title,
        string memory _description,
        string[] memory _candidateNames
    ) external onlyAdmin {
        uint256 ballotId = ballotCount;

        ballots[ballotId].title = _title;
        ballots[ballotId].description = _description;

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            ballots[ballotId].candidates[i] = Candidate({
                name: _candidateNames[i],
                votes: 0
            });
        }

        ballots[ballotId].candidateCount = _candidateNames.length;
        emit BallotCreated(ballotId, _title);

        ballotCount++;
    }

    function vote(uint256 _ballotId, uint256 _candidateIndex) external ballotExists(_ballotId) hasNotVoted(_ballotId) {
    require(msg.sender != admin, "Admins are not allowed to vote");

    require(_candidateIndex < ballots[_ballotId].candidateCount, "Invalid candidate index");

    ballots[_ballotId].candidates[_candidateIndex].votes++;
    ballots[_ballotId].totalVotes++;
    ballots[_ballotId].hasVoted[msg.sender] = true;

    emit Voted(_ballotId, msg.sender, _candidateIndex);
}


     function getAllBallots() external view returns (BallotSummary[] memory) {
        BallotSummary[] memory allBallots = new BallotSummary[](ballotCount);

        for (uint256 i = 0; i < ballotCount; i++) {
            BallotDetails storage details = ballots[i];
            allBallots[i] = BallotSummary({
                title: details.title,
                description: details.description,
                candidateCount: details.candidateCount,
                totalVotes: details.totalVotes
            });
        }

        return allBallots;
    }

    function getBallotDetails(uint256 _ballotId) external view ballotExists(_ballotId) returns (
    string memory title,
    string memory description,
    string[] memory candidateNames,
    uint256[] memory votes,
    uint256 totalVotes
) {
    BallotDetails storage details = ballots[_ballotId];

    title = details.title;
    description = details.description;
    totalVotes = details.totalVotes;

    candidateNames = new string[](details.candidateCount);
    votes = new uint256[](details.candidateCount);

    for (uint256 i = 0; i < details.candidateCount; i++) {
        candidateNames[i] = details.candidates[i].name;
        votes[i] = details.candidates[i].votes;
    }
}

}

