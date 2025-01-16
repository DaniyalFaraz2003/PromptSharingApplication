"use client";

import React, { useState } from 'react'
import { PromptCard } from '@/components/PromptCard';
import type { Prompt } from '@/components/PromptCard';

const Form = ({ title, body, tags, handleDataChange, handleSubmit }: any) => {
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
					<input className="input input-solid max-w-full" placeholder="Enter Tags (Max 3)" type="text" id="tags" />
					<button className='btn btn-primary bg-orange-500'>Add</button>
				</div>

				<div className=''>

				</div>

				<div className="mt-4 flex gap-5">
					<div className='basis-1/2'></div>
					<div className='flex gap-5'>
						<button type="button" className="rounded-lg btn  btn-block border-2 border-orange-500 text-orange-500 bg-transparent font-bold">Cancel</button>
						<button type="submit" className="rounded-lg btn btn-primary btn-block bg-orange-500 font-bold">Create</button>
					</div>
				</div>
			</form>
		</div>
	)
}


const Page = () => {
	const [viewMode, setViewMode] = useState<string>("input");
	const [promptData, setPromptData] = useState<Prompt>({
		id: "",
		username: "",
		title: "",
		body: "",
		tags: []
	})
	const handleViewModeChange = (mode: string) => {
		setViewMode(mode);
	}
	const handlePromptDataChange = (field: string, value: string) => {
		if (field === "tag") {
			setPromptData({
				...promptData,
				tags: [...promptData.tags, value]
			})
		} else if (field === "remove") {
			setPromptData({
				...promptData,
				tags: promptData.tags.filter((tag) => tag !== value)
			})
		} else {
			setPromptData({
				...promptData,
				[field]: value
			})
		}
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(promptData);
		setPromptData({
			id: "",
			username: "",
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
				{viewMode === "input" ? <Form {...promptData} handleSubmit={handleSubmit} handleDataChange={handlePromptDataChange} /> : <PromptCard {...promptData} />}

			</section>
		</div>
	)
}



export default Page