"use client";

import React from 'react';


export type Prompt = {
    image: string
    id: string
    name: string
    username: string
    title: string
    body: string
    tags: string[]
}



export const PromptCard = ({ id, image, name, username, title, body, tags }: Prompt) => {
    return (
        <div className="group card w-80 p-5 bg-white border-4 border-black transition-transform hover:translate-y-[-5px] hover:border-orange-500">
            <div className="flex gap-3 items-center">
                <div className="avatar">
                    {image === "none" ? (
                        <label className="p-3 text-white bg-gray-600 rounded-full" tabIndex={0}>{name.split(' ').length > 1 ? name.split(' ')[0][0] + name.split(' ')[name.split(' ').length - 1][0] : name[0]}</label>
                    ) : (<img src={image} alt="avatar" />)}
                </div>
                <p className="font-bold text-lg">
                    <span className="glitch">{username}</span>
                </p>
            </div>
            <span className="block text-2xl font-bold uppercase text-black mt-2">{title}</span>
            <p className="text-lg font-bold text-gray-700 mt-2">{body}</p>
            <div className="flex gap-2 mt-4">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="badge badge-md bg-slate-700 text-white transition-colors duration-300 border-none group-hover:bg-orange-500"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

