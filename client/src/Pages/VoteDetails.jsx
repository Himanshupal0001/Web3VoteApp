import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VoteDetails() {
    const { isAdmin } = useSelector(store => store.contract)
    const { id } = useParams();
    const { contract } = useSelector((store) => store.contract);
    const [ballotDetails, setBallotDetails] = useState(null);
    const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        const fetchBallotDetails = async () => {
            try {
                const ballotDetails = await contract.getBallotDetails(id);
                setBallotDetails(ballotDetails);

                // Check if user already voted
                const voted = await contract.ballots(id).hasVoted(window.ethereum.selectedAddress);
                setHasVoted(voted);
                alert('You already voted');
            } catch (error) {

                console.error('Error fetching ballot details:', error);
            }
        };

        fetchBallotDetails();
    }, [id, contract, hasVoted]);

    const handleVote = async () => {
        try {
            if (isAdmin === true) {
                alert('Admin cannot vote');
                return
            }
            if (hasVoted === true) {
                alert('You already voted');
                return
            }
            await contract.vote(id, selectedCandidateIndex);
            setHasVoted(true);
            alert('Vote submitted successfully!');
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('Error submitting vote. Please try again.');
        }
    };

    const handleResult = async () => {
        try {
            const getResult = await contract.getWinner(id);
            setWinner(getResult);
            console.log(winner)
        }
        catch (err) {
            console.log('Error getting Winner', err);
            alert('Ballot not yet expired')
        }
    }

    if (!ballotDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className='h=screen w-screen grid'>
            <header className='flex item-center justify-between px-10 py-5 bg-blue-400'>
                <Link to='/vote'>
                    <div className='text-2xl font-medium text-white'>Logo</div>
                </Link>
                <Link to='/vote'>
                    <p className='text-2xl text-white font-medium'>View Dashboard</p>
                </Link>
            </header>

            <div className='grid items-center justify-center'>
                <h1 className='text-4xl font-medium'>Ballot Details</h1>
                <p className='text-xl font-medium'>Title: {ballotDetails[0]}</p>
                <p className='text-xl font-medium'>Description: {ballotDetails[1]}</p>
                <p className='text-xl font-medium'>Total Votes: {ballotDetails[3] ? ballotDetails[3] : 0}</p>

                <p className='text-2xl font-medium'>Candidates:</p>
                <ul>
                    {ballotDetails[6]?.map((candidateName, index) => (
                        <li key={index} className='text-xl'>{`Candidate Id ${index}: ${candidateName}`}</li>
                    ))}
                </ul>

                <p>Votes:</p>
                <ul>
                    {
                        ballotDetails[7]?.map((candVotes, index) => (
                            <li key={index}>{candVotes ? candVotes : 0}</li>
                        ))
                    }
                </ul>

                <p>Expiration Time: {String(ballotDetails[5])} sec</p>

                {hasVoted ? (
                    <p>You have already voted in this ballot.</p>
                ) : (
                    <div>
                        <label className='text-2xl font-medium'>Select Candidate:</label>
                        <select value={selectedCandidateIndex} onChange={(e) => setSelectedCandidateIndex(e.target.value)} className='p-3 bg-green-300'>
                            {ballotDetails[6].map((_, index) => (
                                <option key={index} value={index} >
                                    Candidate {index}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleVote} className='p-3 bg-blue-300 ml-2 rounded-md text-xl font-medium'>
                            Give Vote
                        </button>
                    </div>
                )}
                <p className='text-red-500 text-2xl'><strong>Note: </strong>Please vote accoding to the candidate Id. Candidate Id will be considered as vote. </p>
            </div>

            <div className='grid items-center justify-center'>
                <div className='text-3xl font-medium '>Get Result</div>
                <button onClick={handleResult} className='bg-blue-400 p-2 text-xl text-white rounded-md'>Get Result</button>
                {
                    winner && (
                        <div className='h-32 w-48 bg-green-300'>
                            <p>{winner}</p>
                        </div>
                    )
                }

            </div>

        </div>

    );
}

export default VoteDetails;
