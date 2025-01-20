"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Alert } from '@/components/Alert';
import google from "@/public/google.png"
import { signIn, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from "axios"



const Page = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        image: "none",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alertData, setAlertData] = useState({
        show: false,
        type: "",
        title: "",
        content: "",
    })
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [providers, setProviders] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();


    const signUp = async () => {
        try {
            if (formData.password !== confirmPassword) {
                setAlertData({ type: "alert-error", title: "Error", content: "Passwords do not match", show: true });
                return;
            }
            if (formData.name === "" || formData.username === "" || formData.password === "") {
                setAlertData({ type: "alert-error", title: "Error", content: "Please fill all fields", show: true });
                return;
            }
            
            const res: any = await axios.post("http://localhost:8080/public/create-user", { ...formData, email: formData.username + "@gmail.com" },);
            if (res.status === 200) {
                setAlertData({ type: "alert-success", title: "Success", content: res.data, show: true });
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setAlertData({ type: "alert-warning", title: "Warning", content: "Unauthorized Access", show: true });
            } else if (error.response.status === 400) {
                setAlertData({ type: "alert-error", title: "Error", content: error.response.data, show: true });
            } else {
                setAlertData({ type: "alert-error", title: "Error", content: "Unexpected Error Occurred", show: true });

            }
        }
        setFormData({ name: "", username: "", email: "", password: "", image: "none" });
        setConfirmPassword("");
    }


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // Replace with your desired page
        }
    }, [session, status, router]);


    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
                    <h2 className="card-header self-center text-2xl mb-5">Sign Up</h2>
                    <input value={formData.name} onChange={handleInputChange} name='name' className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Full Name" />
                    <input value={formData.username} onChange={handleInputChange} name='username' className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Username" />
                    <input value={formData.password} onChange={handleInputChange} name='password' type={`${showPassword ? "text" : "password"}`} className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Password" />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' type={`${showPassword ? "text" : "password"}`} className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Confirm Password" />
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="checkbox checkbox-solid-success checked:bg-orange-500 checked:border-orange-500 hover:transition-none" />
                        <label>Show Password</label>
                    </div>

                    {alertData.show && <Alert type={alertData.type} title={alertData.title} content={alertData.content} duration={5000} onDismiss={() => setAlertData({ ...alertData, show: false })} />}

                    <div className="card-footer w-full flex gap-3 flex-col mt-5">
                        <button onClick={() => signUp()} className="btn btn-warning w-full  bg-orange-400 text-white font-bold">Sign Up</button>
                        <p>Already have an account? <Link href={"/auth/login"} className='link link-warning link-underline text-orange-500'>Login</Link></p>
                        {providers &&
                            Object.values(providers).map((provider: any) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className="btn btn-block flex gap-2 border-2 border-gray-500 rounded-3xl google-login-button">
                                    <Image src={google} alt="Google" className="h-4 w-4" />
                                    <p>Sign Up with Google</p>
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;