import React, { useState } from 'react'
import { HERO_IMG } from '../utils/constant'
import { Link, useNavigate } from 'react-router-dom'
import abi from '../contract/Ballot.json'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { setContract } from '../redux/contractSlice'
import UserLoginGuide from '../components/UserLoginGuide'
import { onlyAdmin } from '../utils/constant'
function Homepage() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
        isAdmin: false
    })
    console.log(state)

    const navigate = useNavigate()

    const connectWallet = async () => {
        const contractAddress = '0x2659F24e8F451f20E7B305e88E69E85f74a8D489';
        const contractABI = abi.abi;
        let isAdmin = false
        try {
            const { ethereum } = window;
            if (ethereum === undefined) {
                alert('Install metamask chrome extension');
                return
            }
            if (ethereum) {
                const account = await ethereum.request({ method: "eth_requestAccounts" });
                console.log(account)
                window.ethereum.on('chainChanged', () => {
                    window.location.reload();
                })

                window.ethereum.on('accountsChanged', () => {
                    window.location.reload();
                })

                if (account == onlyAdmin) {
                    isAdmin = true
                }

                const provider = new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const newState = { provider, signer, contract, isAdmin }
                setState(newState)
                dispatch(setContract(newState));
                setTimeout(() => {
                    navigate('/vote')
                }, 200);
            }
        }
        catch (err) {
            console.log("Some Error occured", err)
        }
    }

    return (
        <>
            <UserLoginGuide />
            <div className='h=screen w-screen grid'>
                <header className='flex item-center justify-between px-10 py-5 bg-blue-400'>
                    <Link to='/'>
                        <div className='text-2xl font-medium text-white'>VotApp</div>
                    </Link>
                    <div onClick={() => connectWallet()}>
                        <span className='cursor-pointer text-xl font-medium text-white p-2 bg-blue-600 rounded-xl' >Sign In</span>
                    </div>
                </header>
                <div className='flex justify-center'>
                    <img src={HERO_IMG} alt='img' className='object-contain w-[76vw]' />
                </div>
                <footer className=' py-5 bg-blue-400 px-10'>
                    <p>All rights reserved</p>
                </footer>
            </div>
        </>
    )
}

export default Homepage
