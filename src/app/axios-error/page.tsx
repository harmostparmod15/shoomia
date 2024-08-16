import Link from 'next/link';
import React from 'react'

const page = () => {
    return (
        <div className='border border-red-500 w-full h-[100vh] flex flex-col justify-center items-center' >
            <h1 className='text-2xl font-bold'>This project is under <span className='bg-yellow-200'>development phase</span>  </h1>
            <h2 className='text-xl underline'>You might be facing CORS error </h2>
            <div className='py-12'>


                <h2 className='text-xl'>Here are few steps to follow :  </h2>
                <ul className='list-decimal text-lg  '>
                    <li>
                        <a className='underline' href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en">Install this chrome extension</a>
                    </li>
                    <li>
                        open this extension in chrome browser and click on C:
                    </li>
                    <li className=''>
                        <p>I have followed all the steps , take me to home page </p>
                        <Link href={"/sneakers"}>
                            <button className='bg-blue-900 text-white py-1 px-8 rounded-md my-2'>Click here </button>
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}


export default page;