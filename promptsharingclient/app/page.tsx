import React from "react"
import Link from "next/link"
import { PromptCard } from "@/components/PromptCard"
import type { Prompt } from "@/components/PromptCard"

const HeroSection = () => {
	return (
		<div className="mt-14 flex flex-col gap-1 px-7  items-center justify-center">
			<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 tracking-tight text-center">Unlock Creativity, Share Inspiration</h1>
			<p className="mt-7 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md">
				Discover, create, and share prompts that fuel imagination and productivity — join a community where ideas come to life.
			</p>
			<div className="mt-8 w-full max-w-sm">
				<Link href="/create">
					<button className="btn btn-solid-warning btn-block bg-orange-500 hover:bg-transparent text-white font-bold border-2 border-orange-500 hover:text-orange-500">Create Your Prompt Now</button>
				</Link>
			</div>
			<p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md font-bold">OR</p>
		</div>
	)
}

const PromptSection = () => {
	const prompts: Prompt[] = [
		{
			"id": "1",
			"username": "promptWizard",
			"title": "Creative Writing",
			"body": "A prompt to inspire AI to generate unique and engaging story plots.",
			"tags": ["writing", "storytelling", "creativity"]
		},
		{
			"id": "2",
			"username": "designPro",
			"title": "UI/UX Ideas",
			"body": "A prompt to help AI brainstorm innovative design concepts for modern interfaces.",
			"tags": ["design", "UI/UX", "creativity"]
		},
		{
			"id": "3",
			"username": "codeWhisperer",
			"title": "Debugging Helper",
			"body": "A prompt to guide AI in identifying and fixing complex code bugs efficiently.",
			"tags": ["coding", "debugging", "AI"]
		},
		{
			"id": "4",
			"username": "chatBotMaster",
			"title": "Customer Support Bot",
			"body": "A prompt to train AI to respond empathetically to customer queries and complaints.",
			"tags": ["chatbot", "support", "customer"]
		},
		{
			"id": "5",
			"username": "marketingGuru",
			"title": "Ad Copy Generator",
			"body": "A prompt to get AI to craft catchy and effective marketing ad copy.",
			"tags": ["marketing", "ads", "content"]
		}
	]


	return (
		<div className="flex flex-col gap-1 px-7 mt-4 items-center justify-center ">
			<input className="input-ghost-primary border-gray-600 hover:border-orange-500 focus:border-orange-500 text-gray-800 active:border-orange-500 md:w-1/2 lg:w-1/2 input-block input rounded-none bg-white" placeholder="Search thousands of prompts" />
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
