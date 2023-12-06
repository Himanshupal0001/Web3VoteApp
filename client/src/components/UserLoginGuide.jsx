import React, { useEffect, useState } from 'react'
function UserLoginGuide() {
    const [showBackDrop, setBackDrop] = useState(false);
    const handleClose = () => {
        setBackDrop(false)
    }
    useEffect(() => {
        const interval = setTimeout(() => {
            setBackDrop(!showBackDrop);
        }, 500);
        return () => clearTimeout(interval)
    }, [])
    return <>
        {
            showBackDrop && (
                <div className='absolute h-screen w-screen bg-black-rgba flex items-center justify-center'>
                    <div className='bg-white h-[40vh] w-[50vw] rounded-2xl p-4'>
                        <div className='h-[5vh] flex items-center justify-end cursor-pointer' onClick={handleClose}>
                            <p className='p-4 bg-green-400 rounded-full h-6 w-6 flex items-center justify-center'>X</p>
                        </div>
                        <section>
                            <p className='text-2xl font-medium'>Note</p>
                            <strong className='text-4xl'>Hi User 👋</strong>
                            <p>Welcome to Web3 Voting System</p>
                            <p>For login into the application you need Metamask wallet. </p>
                            <p>You must add Metamask extension to your browser and login with you Metamask Account</p>
                            <p>For furthur guidence please click on the link below</p>
                            <a href='https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/' target='_blank' className='text-blue-500 text-xl hover:underline'>Metamask Guidence Link</a>
                        </section>
                    </div>
                </div>)
        }
    </>



}

export default UserLoginGuide