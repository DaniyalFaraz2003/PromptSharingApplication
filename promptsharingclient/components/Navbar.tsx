"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks'
import { removeData } from '@/lib/features/userSlice';
import axios from 'axios';

type User = {
    name: string,
    email: string,
    username: string,
    password: string,
    image: string,
    id: string
}

export const Navbar = () => {
    const { data: session } = useSession();
    const name = useAppSelector(state => state.user.username)
    const password = useAppSelector(state => state.user.password)   
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res: any = await axios.get("http://localhost:8080/public/user", {
                    auth: {
                        username: name,
                        password: password
                    }
                })
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUserData();
    }, [])

    return (
        <nav className='flex p-3 items-center w-full bg-transparent text-black shadow-sm' role='navigation'>
            <div className='flex items-center space-x-2'>
                <div>
                    <Image src={logo} alt='logo' className='w-12 h-12' />
                </div>
                <h1>
                    <a href='/' className='text-2xl/7 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 sm:truncate sm:text-3xl sm:tracking-tight'>SharePrompt</a>
                </h1>
            </div>

            {session?.user ? (
                <div className='flex items-center space-x-4 ml-auto'>
                    <h1 className='font-bold text-xl text-black'>{session?.user.name}</h1>
                    <div className="popover">
                        {session?.user.image ? (
                            <>
                                <label className='popover-trigger' tabIndex={0}>
                                    <Image
                                        src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile'
                                    />
                                </label>
                                <div className="popover-content popover-bottom-left w-32" tabIndex={0}>
                                    <button onClick={() => signOut()} className="btn btn-warning bg-orange-400 text-white font-bold">Log Out</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <label className="popover-trigger btn p-3 text-white bg-gray-600 rounded-full" tabIndex={0}>DF</label>
                                <div className="popover-content popover-bottom-left w-32" tabIndex={0}>
                                    <button onClick={() => signOut()} className="btn btn-warning bg-orange-400 text-white font-bold">Log Out</button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            ) : user ? (
                <div className='flex items-center space-x-4 ml-auto'>
                    <h1 className='font-bold text-xl text-black'>{user.name}</h1>
                    <div className="popover">

                        <>
                            <label className="popover-trigger btn p-3 text-white bg-gray-600 rounded-full" tabIndex={0}>{user.name.split(' ')[0][0] + user.name.split(' ')[1][0]}</label>
                            <div className="popover-content popover-bottom-left w-32" tabIndex={0}>
                                <button onClick={() => {
                                    dispatch(removeData())
                                    setUser(null)
                                }} className="btn btn-warning bg-orange-400 text-white font-bold">Log Out</button>
                            </div>
                        </>
                    </div>
                </div>
            ) : (
                <div className='flex items-center space-x-4 ml-auto'>
                    <Link href='/auth/login'>
                        <button className="btn btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400 font-bold">Login</button>
                    </Link>
                    <Link href='/auth/signup'>
                        <button className="btn btn-warning  bg-orange-400 text-white font-bold">Sign Up</button>
                    </Link>
                </div>
            )}
        </nav>
    );
}