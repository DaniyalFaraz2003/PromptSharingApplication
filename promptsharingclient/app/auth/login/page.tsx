"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { Alert } from '@/components/Alert';
import Image from 'next/image';
import google from "@/public/google.png"
import { signIn, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [providers, setProviders] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // Replace with your desired page
        }
    }, [session, status, router]);

    useEffect(() => {
        (async () => {
            const res: any = await getProviders();
            setProviders(res);
        })();

    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-full mt-14'>

            <div className="card bg-white border-4 border-orange-500">
                <div className="card-body flex">
                    <h2 className="card-header self-center text-2xl mb-5">Login</h2>
                    <input name='username' className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Username" />
                    <input name='password' type={`${showPassword ? "text" : "password"}`} className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Password" />
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="checkbox checkbox-solid-success checked:bg-orange-500 checked:border-orange-500 hover:transition-none" />
                        <label>Show Password</label>
                    </div>
                    <div className="card-footer w-full flex gap-3 flex-col mt-5">
                        <button className="btn w-full btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400 font-bold">Login</button>
                        <p>Dont have an account? <Link href={"/auth/signup"} className='link link-warning link-underline text-orange-500'>Sign Up</Link></p>

                        {providers &&
                            Object.values(providers).map((provider: any) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className="btn btn-block flex gap-2 border-2 border-gray-500 rounded-3xl google-login-button">
                                    <Image src={google} alt="Google" className="h-4 w-4" />
                                    <p>Sign In with Google</p>
                                </button>
                            ))}


                    </div>
                </div>
            </div>
        </div>
    )
}


export default Page;