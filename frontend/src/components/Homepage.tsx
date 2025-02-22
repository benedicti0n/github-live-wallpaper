import React, { useState } from 'react';
import { useClerk, useSession } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'

import Input from './ui/Input';
import Button from './ui/Button';
import GithubBento from './GithubBento/GithubBento';
import { DotPattern } from './magicui/dot-pattern';

import { useGithubData } from '../hooks/useGithubData';
import { removeGithubDataFromLocalStorage } from '../utils/removeLocalStorage';

import { LucideSearch, LucideShare } from 'lucide-react';

const Homepage = () => {
    const navigate = useNavigate()
    const { isSignedIn } = useSession()
    const { openSignIn } = useClerk()

    const { githubData, fetchGithubData } = useGithubData()
    const [username, setUsername] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchGithubData(username);
            removeGithubDataFromLocalStorage();
        }
    };


    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center relative">
            <div className="w-full h-full flex flex-col justify-center items-center py-16">
                <DotPattern height={32} width={32} />
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
                    <div className='w-full flex flex-col items-center justify-center'>
                        <GithubBento githubData={githubData} />
                        <div className='mx-2'>
                            <Button text='Set As Wallpaper' onClickFunction={() => {
                                if (isSignedIn) {
                                    navigate(`/dashboard`)
                                } else {
                                    openSignIn()
                                }
                            }} icon={<LucideShare />} />
                        </div>
                    </div>
                ) : (
                    <h1>User not found</h1>
                )
                }
            </div >
        </div >
    );
};

export default Homepage;