
const HeroSection = () => {
	return (
		<div className="mt-14 flex flex-col gap-1 px-7  items-center justify-center">
			<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-orange-400 to-yellow-400 tracking-tight text-center">Unlock Creativity, Share Inspiration</h1>
			<p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md">
				Discover, create, and share prompts that fuel imagination and productivity — join a community where ideas come to life.
			</p>
			<div className="mt-8 w-full max-w-sm">
				<button className="btn btn-solid-warning btn-block bg-orange-500 hover:bg-transparent text-white font-bold border-2 border-orange-500 hover:text-orange-500">Create Your Prompt Now</button>
			</div>
			<p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-700 sm:tracking-wide text-center font-md font-bold">OR</p>
		</div>
	)
}

const PromptSection = () => {
	return (
		<div className="flex flex-col gap-1 px-7 mt-4 items-center justify-center ">
			<input className="input-ghost-primary border-gray-600 hover:border-orange-500 focus:border-orange-500 text-gray-800 active:border-orange-500 md:w-1/2 lg:w-1/2 input-block input rounded-none bg-white" placeholder="Search thousands of prompts" />
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
