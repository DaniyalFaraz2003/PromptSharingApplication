"use client";

import React, { useState } from 'react'
import Link from 'next/link';

const Page = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className='flex flex-col items-center justify-center w-full mt-14'>
            <div className="card bg-white border-4 border-orange-500">
                <div className="card-body flex">
                    <h2 className="card-header self-center text-2xl mb-5">Login</h2>
                    <input name='username' className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Username" />
                    <input name='password' type={`${showPassword ? "text" : "password"}`} className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Password" />
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={showPassword} onClick={() => setShowPassword(!showPassword)} className="checkbox checkbox-solid-success checked:bg-orange-500 checked:border-orange-500 hover:transition-none" />
                        <label>Show Password</label>
                    </div>
                    <div className="card-footer w-full flex gap-2 flex-col mt-5">
                        <button className="btn w-full btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400 font-bold">Login</button>
                        <p>Dont have an account? <Link href={"/signup"} className='link link-warning link-underline text-orange-500'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;