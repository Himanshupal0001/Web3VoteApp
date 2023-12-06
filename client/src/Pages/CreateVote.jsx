import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function CreateVote() {
    const [ballotName, setBallotName] = useState('');
    const [ballotDesc, setBallotDesc] = useState('');
    const [candidate, setCandidate] = useState([''])
    const [electionDuration, setElectionDuration] = useState(null);

    const { contract } = useSelector(store => store.contract)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const electDu = Number(electionDuration);
        if ((ballotDesc && ballotName) === '' || electDu === 0) {
            alert('All fields are requied');
            return
        }
        const formData = {
            ballotName,
            ballotDesc,
            candidate,
            electDu
        };
        console.log(formData);
        try {
            const newBallot = await contract.createBallot(formData.ballotName, formData.ballotDesc, formData.candidate, formData.electDu)
            newBallot.wait();
            console.log('ballot created', newBallot)

        }
        catch (err) {
            console.log('Error caught while creating ballot', err)
        }
    }

    const handleAddMore = () => {
        console.log('add more clicked');
        setCandidate([...candidate, '']);
    };

    // remove button functioanlity feature
    // const handleRemove = index => {
    //     const list = [...candidate];
    //     list.splice(index,1);
    //     setCandidate(list);
    // }

    const handleCandidateChange = (e, index) => {
        //const { name, value } = e.target;
        const { value } = e.target
        const list = [...candidate];
        //list[index][name] = value;
        list[index] = value
        setCandidate(list)
    }
    return (
        <div className='h=screen w-screen grid'>
            <header className='flex item-center justify-between px-10 py-5 bg-blue-400'>
                <Link to='/vote'>
                    <div className='text-2xl font-medium text-white'>Logo</div>
                </Link>
                <Link to='/vote' className='text-2xl font-medium text-white'>
                    <p>View Dashboard</p>
                </Link>
            </header>
            <div className=' grid items-center  justify-center w-full'>
                <p className='text-4xl font-medium  m-4 flex justify-center'>Create Ballot</p>
                <form onSubmit={(e) => handleSubmit(e)} className='grid'>
                    <label htmlFor='ballot-name'>Ballot Name: </label>
                    <input type='text' id='ballot-name' name='ballot-name' value={ballotName}
                        onChange={e => setBallotName(e.target.value)} className='p-2 bg-blue-100' />
                    <label htmlFor='ballot-desc'>Ballot Description: </label>
                    <textarea type='text' id='ballot-desc' name='ballot-desc' value={ballotDesc}
                        onChange={e => setBallotDesc(e.target.value)} className='p-2 bg-blue-100' />
                    <label htmlFor='election-duration'>Enter Election Duration in Minutes :</label>
                    <input type='number' id='election-duration' className='p-2 bg-blue-100' onChange={e => setElectionDuration(e.target.value)} />
                    <div className='mt-4'>
                        {
                            candidate?.map((_, index) =>
                            (
                                <div key={index} className='mt-2'>
                                    <label htmlFor='name'>Candidate name : </label>
                                    <input id='name' name='name' className='p-2 bg-blue-100' type='text' value={candidate[index]} onChange={e => handleCandidateChange(e, index)} />
                                </div>
                            )
                            )
                        }
                        <button onClick={handleAddMore} className='bg-green-400 p-2 rounded-md'>Add More</button>

                    </div>
                    <button type='submit' className='bg-blue-400 p-2 rounded-md text-white mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateVote


/**
 {
                        candidateFields?.map((index, item) => {
                            return (
                                <div className='mt-2' >
                                    <div key={index}>
                                        <label htmlFor='candidate-index'>Candidate Index</label>
                                        <input type='number' name='candidate-index' id='candidate-index' className='bg-blue-200' />
                                        <label htmlFor='candidate-name'>Candidate Name</label>
                                        <input type='text' name='candidate-name' id='candidate-name' className='bg-blue-200' />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
 */
