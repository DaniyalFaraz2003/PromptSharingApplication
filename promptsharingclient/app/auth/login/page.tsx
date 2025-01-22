"use client";

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { Alert } from '@/components/Alert';
import Image from 'next/image';
import google from "@/public/google.png"
import { signIn, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setData } from '@/lib/features/userSlice';


const Page = () => {
    const name = useAppSelector(state => state.user.username)
    const password = useAppSelector(state => state.user.password)
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [providers, setProviders] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [alertData, setAlertData] = useState({
        show: false,
        type: "",
        title: "",
        content: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const signInManual = async () => {
        try {
            if (!formData.username || !formData.password) {
                setAlertData({
                    show: true,
                    type: "alert-error",
                    title: "Error",
                    content: "Please fill in all fields"
                });
                return;
            }
            const res: any = await axios.get("http://localhost:8080/public/login", {
                auth: {
                    username: formData.username,
                    password: formData.password
                }
            })
            if (res.status === 200) {
                dispatch(setData({ username: formData.username, password: formData.password }))
                


                setAlertData({
                    show: true,
                    type: "alert-success",
                    title: "Success",
                    content: "Login Successful"
                });

                setTimeout(() => {
                    router.push("/");
                }, 1000);
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setAlertData({
                    show: true,
                    type: "alert-error",
                    title: "Error",
                    content: "Invalid Username or Password"
                });
            }
        }
        setFormData({ username: "", password: "" });
    }

    useEffect(() => {
        if (status === "authenticated" || name !== "") {


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
                    <input value={formData.username} onChange={handleInputChange} name='username' className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Username" />
                    <input value={formData.password} onChange={handleInputChange} name='password' type={`${showPassword ? "text" : "password"}`} className="input input-solid rounded-lg text-black bg-white focus:border-orange-500 active:border-orange-500 border-2 px-3 border-gray-500" placeholder="Password" />
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="checkbox checkbox-solid-success checked:bg-orange-500 checked:border-orange-500 hover:transition-none" />
                        <label>Show Password</label>
                    </div>

                    {alertData.show && <Alert type={alertData.type} title={alertData.title} content={alertData.content} duration={5000} onDismiss={() => setAlertData({ ...alertData, show: false })} />}

                    <div className="card-footer w-full flex gap-3 flex-col mt-5">
                        <button onClick={() => signInManual()} className="btn w-full btn-outline-warning  border-orange-400 text-orange-400 hover:bg-orange-400 font-bold">Login</button>
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