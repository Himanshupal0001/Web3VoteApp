import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function VotingPage() {
    const [ballotList, setBallotList] = useState([]);
    const { contract, isAdmin } = useSelector(store => store.contract);

    const getAllBallots = async () => {
        try {
            const activeBallotData = await contract.getActiveBallots();
            const activeBallotIds = activeBallotData[0];
            const activeTitles = activeBallotData[1];
            const activeDescriptions = activeBallotData[2];

            const activeBallotsList = activeBallotIds.map((id, index) => ({
                id,
                title: activeTitles[index],
                description: activeDescriptions[index],
            }));

            setBallotList(activeBallotsList);
        }

        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllBallots();
    }, [])

    return (
        <div className='h=screen w-screen grid'>
            <header className='flex item-center justify-between px-10 py-5 bg-blue-400'>
                <Link to='/vote'>
                    <div className='text-2xl font-medium text-white'>Logo</div>
                </Link>
                {
                    isAdmin && (
                        <div className='flex gap-4'>
                            <Link to='/create-vote'>
                                <span className='p-2 rounded-md bg-blue-500 text-white'>Create Vote</span>
                            </Link>
                        </div>
                    )
                }

            </header>
            <section className='h-[90vh] w-full bg-green-300 flex flex-col items-center'>
                <p className='font-medium text-xl'>{ballotList.length !== 0 ? 'Welcome to Voting Dahsboard.' : 'Nothing to show here 😿'}</p>

                <div className='h-[80vh] px-24 py-8 flex item-center justify-start gap-4 flex-wrap '>
                    {
                        ballotList?.map(ballot => (
                            <Link to={`/vote-details/${ballot.id}`} key={ballot.id}>
                                <div className='h-48 w-52 bg-white p-6 rounded-md' >
                                    <div className='h-12 flex items-center text-l font-medium  border-b-4' > {ballot.title}</div>
                                    <div><span className='font-medium'>Description:</span> {ballot.description}</div>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </section>
        </div>
    )
}

export default VotingPage
