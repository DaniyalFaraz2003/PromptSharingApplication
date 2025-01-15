import React from 'react';
import Image from "next/image";
import logo from "@/public/logo.png";

export const Navbar = () => {

    return (
        <nav className='flex p-3 items-center fixed w-full bg-transparent text-black shadow-sm' role='navigation'>
            <div className='flex items-center space-x-2'>
                <div>
                    <Image src={logo} alt='logo' className='w-12 h-12' />
                </div>
                <h1>
                    <a href='/' className='text-2xl/7 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 sm:truncate sm:text-3xl sm:tracking-tight'>SharePrompt</a>
                </h1>
            </div>
            <div className='flex items-center space-x-4 ml-auto'>
            <button className="btn btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400">Login</button>
            <button className="btn btn-warning  bg-orange-400 text-white">Sign Up</button>
            </div>
        </nav>
    );
}