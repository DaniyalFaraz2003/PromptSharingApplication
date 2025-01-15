import React from 'react'
import Image from 'next/image'
import logo from "@/public/logo.png";

export const Footer = () => {
    return (
        <footer className="w-full bg-white p-4">
            <div className="flex flex-col md:flex-row lg:flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <Image src={logo} alt='logo' className='h-10 w-10' />
                <ul className="flex flex-wrap text-lg items-center gap-y-2 gap-x-8">
                    <li>
                        <a
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            About Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            License
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contribute
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact Us
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="my-4 border-blue-gray-50" />
            <h1 color="blue-gray" className="text-center text-lg font-normal">
                &copy; 2023 by Daniyal Faraz
            </h1>
        </footer>
    )
}