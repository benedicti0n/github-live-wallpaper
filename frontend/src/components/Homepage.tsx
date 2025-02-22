import React, { useState } from 'react';
import { useClerk, useSession } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'

import Input from './ui/Input';
import Button from './ui/Button';
import GithubBento from './GithubBento/GithubBento';
import { DotPattern } from './magicui/dot-pattern';
import { LineShadowText } from './magicui/line-shadow-text';

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
        <div className="w-full min-h-screen flex flex-col items-center relative">
            <div className="w-full h-full flex flex-col items-center mt-48 py-16">
                <DotPattern height={32} width={32} />
                <LineShadowText className='text-8xl font-extrabold italic' shadowColor='black'>
                    GitPaper
                </LineShadowText>
                {/* <p className="text-xl font-semibold mt-2">Generate yours now 👇🏼</p> */}
                <div className="mt-8 gap-2 flex">
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

                {githubData && (
                    <div className='w-full flex flex-col items-center justify-center mt-4'>
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
                )}
            </div >
        </div >
    );
};

export default Homepage;