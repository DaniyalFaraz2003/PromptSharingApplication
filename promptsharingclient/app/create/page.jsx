"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { PromptCard } from '@/components/PromptCard';
import { Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import axios from "axios"


const Tag = ({ value, index, handleDataChange }) => {
	return (
		<div className='flex gap-2'>
			<span className="rounded-lg py-2 px-4 flex gap-3 bg-orange-500 text-white">{value}
				<Trash size={20} className='cursor-pointer' onClick={() => handleDataChange("remove", index)} />
			</span>
		</div>
	)
}

const Form = ({ title, body, tags, handleDataChange, handleSubmit }) => {
	const [tag, setTag] = useState("");

	return (
		<div className="p-8 shadow-lg">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="w-full">
					<label className="sr-only" htmlFor="name">Title</label>
					<input value={title} onChange={(event) => handleDataChange("title", event.target.value)} className="input input-solid max-w-full" placeholder="Title" type="text" id="name" />
				</div>


				<div className="w-full">
					<label className="sr-only" htmlFor="message">Prompt</label>

					<textarea value={body} onChange={(event) => handleDataChange("body", event.target.value)} className="textarea textarea-solid max-w-full" placeholder="Type your prompt here" rows={8} id="message"></textarea>
				</div>

				<div className='w-full flex gap-4'>
					<label className="sr-only" htmlFor="tags">Tags</label>
					<input value={tag} onChange={(event) => setTag(event.target.value.split(' ')[0])} className="input input-solid max-w-full" placeholder="Enter Tags (Max 3)" type="text" id="tags" />
					<button type='button' onClick={() => {
						handleDataChange("tag", tag)
						setTag("")
					}} className='btn btn-primary bg-orange-500'>Add</button>
				</div>

				<div className='flex gap-2 flex-wrap'>
					{tags.map((tag, index) => (
						<Tag key={index} value={tag} handleDataChange={handleDataChange} index={index} />
					))}
				</div>

				<div className="mt-4 flex gap-5">
					<div className='basis-1/2'></div>
					<div className='flex gap-5'>
						<Link href="/">
							<button type="button" className="rounded-lg btn  btn-block border-2 border-orange-500 text-orange-500 bg-transparent font-bold">Cancel</button>
						</Link>
						<button type="submit" className="rounded-lg btn btn-primary btn-block bg-orange-500 font-bold">Create</button>
					</div>
				</div>
			</form>
		</div>
	)
}


const Page = () => {
	const router = useRouter();
	const name = useAppSelector(state => state.user.username);
	const password = useAppSelector(state => state.user.password);
	const { data: session, status } = useSession();
	const [viewMode, setViewMode] = useState("input");
	const [promptData, setPromptData] = useState({
		image: session?.user?.image || "",
		id: "",
		name: session?.user?.name || "",
		username: session?.user?.username || "",
		title: "",
		body: "",
		tags: []
	})



	useEffect(() => {
		if (!session && !name) {
			router.push("/")
		}
	}, [session, name])

	useEffect(() => {
		if (status === "authenticated") {
			setPromptData({
				...promptData,
				image: session.user.image,
				username: session.user.username
			})
		}
	}, [status])

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await axios.get("http://localhost:8080/user/get-user", {
					auth: {
						username: name,
						password: password
					}
				})
				setPromptData({
					...promptData,
					image: response.data.image,
					username: response.data.username,
					name: response.data.name
				})
			} catch (error) {
				console.log(error)
			}
		}

		if (name && password) {
			getUserData();
		}

	}, [])


	const handleViewModeChange = (mode) => {
		setViewMode(mode);
	}
	const handlePromptDataChange = (field, value) => {
		if (field === "tag") {
			if (promptData.tags.length < 3) {
				setPromptData({
					...promptData,
					tags: [...promptData.tags, value]
				})
			}
		} else if (field === "remove") {
			setPromptData({
				...promptData,
				tags: promptData.tags.filter((_, index) => index !== value)
			})
		} else {
			setPromptData({
				...promptData,
				[field]: value
			})
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(promptData);
		setPromptData({
			...promptData,
			title: "",
			body: "",
			tags: []
		})
	}

	return (
		<div className='flex items-center gap-5 flex-col w-full h-full mt-14 justify-center'>
			<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 tracking-tight text-center'>Create A New Prompt</h1>
			<section className="bg-white rounded-xl w-full max-w-md">
				<div className="tabs w-full flex">
					<input type="radio" id="tab-4" value={"input"} checked={viewMode === "input"} onChange={() => handleViewModeChange("input")} name="tab-2" className="tab-toggle" />
					<label htmlFor="tab-4" className="tab flex text-center tab-bordered basis-1/2 px-6 justify-center font-bold">Input</label>

					<input type="radio" value={"preview"} checked={viewMode === "preview"} onChange={() => handleViewModeChange("preview")} id="tab-5" name="tab-2" className="tab-toggle" />
					<label htmlFor="tab-5" className="tab tab-bordered flex text-center basis-1/2 px-6 justify-center font-bold">Preview</label>
				</div>
				{viewMode === "input" ? <Form {...promptData} handleSubmit={handleSubmit} handleDataChange={handlePromptDataChange} /> : <div className='p-8 flex justify-center'>
					<PromptCard {...promptData} />
				</div>}

			</section>
		</div>
	)
}



export default Page