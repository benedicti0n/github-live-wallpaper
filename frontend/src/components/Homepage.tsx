import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

import Navbar from './Navbar';
import Input from './ui/Input';
import Button from './ui/Button';
import GithubBento from './GithubBento/GithubBento';
import { useGithubData } from '../hooks/useGithubData';
import { removeGithubDataFromLocalStorage } from '../utils/removeLocalStorage';

import { LucideSearch } from 'lucide-react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Homepage = () => {
    const { githubData, fetchGithubData } = useGithubData()
    const [username, setUsername] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchGithubData(username);
            removeGithubDataFromLocalStorage();
        }
    };


    const { user } = useUser();
    console.log(user);


    useEffect(() => {
        if (user) {
            // Send user.id to your backend
            fetch(`${serverUrl}/api/v1/userSignup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clerkUserId: user.id }),
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to save Clerk ID');
                    }
                    return res.json();
                })
                .then(data => {
                    // Handle success, e.g., update local state
                    console.log('Clerk ID saved:', data);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error saving Clerk ID:', error);
                    // Optionally, display an error message to the user
                    alert('There was an error saving your user ID. You will be signed out.');
                });
            console.log("data sent to backend");
        }
    }, [user]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center relative">
            <Navbar />
            <div className="w-full h-full flex flex-col justify-center items-center py-16">
                <h1 className="text-7xl font-extrabold bg-gradient-to-br from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                    Github Live Wallpaper
                </h1>
                <p className="text-xl font-semibold mt-2">Generate yours now 👇🏼</p>
                <div className="mt-4 gap-1 flex">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter GitHub username"
                    />
                    <Button text="Search" icon={<LucideSearch />} onClickFunction={() => {
                        fetchGithubData(username);
                        removeGithubDataFromLocalStorage();
                    }} />
                </div>

                {githubData ? (
                    <GithubBento githubData={githubData} />
                ) : (
                    githubData === null && <h1>User not found</h1>
                )}
            </div>
        </div>
    );
};

export default Homepage;