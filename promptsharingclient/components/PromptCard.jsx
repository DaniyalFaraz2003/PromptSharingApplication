"use client";

import React from 'react';



export const PromptCard = ({ id, title, content, tags, author }) => {
    return (
        <div className="group card w-80 p-5 bg-white border-4 border-black transition-transform hover:translate-y-[-5px] hover:border-orange-500">
            <div className="flex gap-3 items-center">
                <div className="avatar">
                    {author.image === "none" ? (
                        <label className="p-3 text-white bg-gray-600 rounded-full" tabIndex={0}>{author.name.split(' ').length > 1 ? author.name.split(' ')[0][0] + author.name.split(' ')[author.name.split(' ').length - 1][0] : author.name[0]}</label>
                    ) : (<img src={author.image} alt="avatar" />)}
                </div>
                <p className="font-bold text-lg">
                    <span className="glitch">{author.username}</span>
                </p>
            </div>
            <span className="block text-2xl font-bold uppercase text-black mt-2">{title}</span>
            <p className="text-lg font-bold text-gray-700 mt-2">{content}</p>
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

