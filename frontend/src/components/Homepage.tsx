import React, { useEffect, useState } from 'react';
import { useClerk, useSession } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'

import Input from './ui/Input';
import Button from './ui/Button';
import GithubBento from './GithubBento/GithubBento';
import { LineShadowText } from './magicui/line-shadow-text';

import { useGithubData } from '../hooks/useGithubData';
import { removeGithubDataFromLocalStorage } from '../utils/removeLocalStorage';

import { LucideSearch, LucideShare } from 'lucide-react';
import { NumberTicker } from './magicui/number-ticker';
import { GlowEffect } from './ui/glow-effect';

const Homepage = () => {
    const navigate = useNavigate()
    const { isSignedIn } = useSession()
    const { openSignIn } = useClerk()

    const { githubData, fetchGithubData } = useGithubData()
    const [username, setUsername] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        setIsLoading(true);
        await fetchGithubData(username);
        removeGithubDataFromLocalStorage();
        setIsLoading(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center relative">
            <div className="w-full h-full flex flex-col items-center mt-56 py-16">
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
                    <Button text="Search" icon={<LucideSearch />} onClickFunction={() => handleSearch()} />
                </div>

                {isLoading &&
                    <div className="flex items-center relative mt-16">
                        <GlowEffect
                            colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
                            mode='colorShift'
                            blur='soft'
                            duration={3}
                            scale={0.7}
                        />
                        <div className='flex bg-background z-10 border border-border font-semibold rounded-xl px-6 py-2 gap-2'>
                            <h1>Loading</h1>
                            <NumberTicker value={100} />
                        </div>
                    </div>
                }

                {(!isLoading && githubData) && (
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