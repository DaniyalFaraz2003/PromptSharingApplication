"use client";

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { PromptCard } from "@/components/PromptCard";
import { useSession } from "next-auth/react"
import { useAppSelector } from "@/lib/hooks";
import axios from "axios"

const HeroSection = () => {
	const name = useAppSelector(state => state.user.username)
	const { data: session } = useSession()

	return (
		<div className="mt-14 flex flex-col gap-1 px-7  items-center justify-center">
			<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 tracking-tight text-center">Unlock Creativity, Share Inspiration</h1>
			<p className="mt-7 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md">
				Discover, create, and share prompts that fuel imagination and productivity — join a community where ideas come to life.
			</p>
			<div className="mt-8 w-full max-w-sm">
				<Link href={(session || name) ? "/create" : "/auth/login"}>
					<button className="btn btn-solid-warning btn-block bg-orange-500 hover:bg-transparent text-white font-bold border-2 border-orange-500 hover:text-orange-500">Create Your Prompt Now</button>
				</Link>
			</div>
			<p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md font-bold">OR</p>
		</div>
	)
}

const PromptSection = () => {

	const [prompts, setPrompts] = useState([]);
	const [selectedValue, setSelectedValue] = useState("all");

	const handleValueChange = (value) => {
		setSelectedValue(value);
	}

	useEffect(() => {
		const getPrompts = async () => {
			try {
				const response = await axios.get("http://localhost:8080/prompt/all");
				setPrompts(response.data);
			} catch (ex) {
				console.log(ex);
			}
		}

		getPrompts();
	}, [])


	return (
		<div className="flex flex-col gap-1 px-7 mt-4 items-center justify-center ">



			<input className="input-ghost-primary border-gray-600 hover:border-orange-500 focus:border-orange-500 text-gray-800 active:border-orange-500 md:w-1/2 lg:w-1/2 input-block input rounded-none bg-white" placeholder="Search thousands of prompts" />

			<div className="grid w-[30%] place-items-center mt-5">
				<div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-white p-2">
					<div>
						<input type="radio" onChange={() => handleValueChange("all")} name="all" id="all" value="all" className="peer hidden" checked={selectedValue === "all"} />
						<label htmlFor="all" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-orange-500 peer-checked:font-bold peer-checked:text-white">All Prompts</label>
					</div>

					<div>
						<input type="radio" onChange={() => handleValueChange("my")} name="my" id="my" value="my" className="peer hidden" checked={selectedValue === "my"}/>
						<label htmlFor="my" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-orange-500 peer-checked:font-bold peer-checked:text-white">My Prompts</label>
					</div>

				</div>
			</div>

			<div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{prompts.map((prompt) => (
					<PromptCard key={prompt.id} {...prompt} />
				))}
			</div>
		</div>
	)
}

export default function Home() {

	return (
		<>
			<HeroSection />
			<PromptSection />
		</>
	);
}
