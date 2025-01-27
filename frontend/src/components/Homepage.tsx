import React, { useState } from 'react';

import Navbar from './Navbar';
import Input from './ui/Input';
import Button from './ui/Button';
import GithubBento from './GithubBento/GithubBento';

import { LucideSearch } from 'lucide-react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Homepage = () => {
    const [username, setUsername] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleSearch = async () => {
        // if (!setUsername.trim()) {
        //     alert('Please enter a Github username!')
        //     return
        // }

        try {
            console.log(username);

            const response = await fetch(`${serverUrl}/fetchProfileStats`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ username })
            })

            if (!response.ok) {
                throw new Error('Failed to fetch GitHub stats');
            }

            const data = await response.json();
            console.log('GitHub Stats:', data);
        } catch (error) {
            console.error('Error fetching GitHub stats:', error.message);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-3/4 min-h-screen px-4 flex flex-col justify-center items-center relative">
            <Navbar />
            <div className="w-full h-full flex flex-col justify-center items-center py-16">
                <h1 className="text-7xl font-extrabold bg-gradient-to-br from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                    Github Live Wallpaper
                </h1>
                <p className="text-xl font-semibold mt-2">Generate yours now 👇🏼</p>
                <div className="mt-4 gap-1 flex">
                    <Input
                        value={username}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter GitHub username"
                    />
                    <Button text="Search" icon={<LucideSearch />} onClickFunction={handleSearch} />
                </div>
                <GithubBento />
            </div>
        </div>
    );
};

export default Homepage;