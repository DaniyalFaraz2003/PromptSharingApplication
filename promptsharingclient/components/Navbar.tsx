import React from 'react';
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from 'next/link';

export const Navbar = () => {
    const loggedIn = false;
    const username = 'John Doe';
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
            {!loggedIn && (
                <div className='flex items-center space-x-4 ml-auto'>
                    <Link href='/auth/login'>
                        <button className="btn btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400 font-bold">Login</button>
                    </Link>
                    <Link href='/auth/signup'>
                        <button className="btn btn-warning  bg-orange-400 text-white font-bold">Sign Up</button>
                    </Link>
                </div>
            )}

            {loggedIn && (
                <div className='flex items-center space-x-4 ml-auto'>
                    <h1 className='font-bold text-xl text-black'>{username}</h1>
                    <div className="popover">
                        <label className="popover-trigger btn p-3 text-white bg-gray-600 rounded-full" tabIndex={0}>DF</label>
                        <div className="popover-content popover-bottom-left w-32" tabIndex={0}>
                            <button className="btn btn-warning bg-orange-400 text-white font-bold">Log Out</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}