import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import GithubBento from '../GithubBento/GithubBento';
import Navbar from '../Navbar';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LucideSearch } from 'lucide-react';
import { UserDetails } from '../GithubBento/types';
import { useGithubData } from '../../hooks/useGithubData';
import { removeGithubDataFromLocalStorage } from '../../utils/removeLocalStorage';

const CreateWallaper = () => {
    const { platform } = useParams<{ platform: string }>();
    const githubDataFromLocalStorage: UserDetails | null = localStorage.getItem("githubData")
        ? JSON.parse(localStorage.getItem("githubData") as string)
        : null;

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
            <Navbar />
            <div className="w-full h-full flex flex-col justify-center items-center py-16">
                {
                    !githubDataFromLocalStorage &&
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
                }

                {githubData ? (
                    <GithubBento githubData={githubDataFromLocalStorage ? githubDataFromLocalStorage : githubData} />
                ) : (
                    githubData === null && <h1>User not found</h1>
                )}
            </div>
        </div>
    )
}

export default CreateWallaper