import { toJpeg, toPng } from 'html-to-image';
import React, { useRef, useCallback } from 'react';
import { UserDetails } from './types';

import GithubGraph from "../GithubGraph";
import { BluePallete, GreenPallete, PurplePallete } from "./ColorHues";
import { LucideCalendar, LucideEllipsis, LucideFlame, LucideGitBranch, LucideGitCommit, LucideGitPullRequest, LucideMapPinHouse, LucideStar, LucideUser, LucideFileImage, LucideImage, LucideCircleDot, LucideCode, LucideFolderGit, LucideGitCommitVertical } from "lucide-react";
import Button from '../ui/Button';

const colorPallete = PurplePallete;
const corsProxy = "https://cors-anywhere.herokuapp.com/";

const GithubBento = ({ githubData }: { githubData: UserDetails }) => {
    const componentRef = useRef<HTMLDivElement>(null)

    // @ts-expect-error: Nested userDetails structure
    const streakStats = githubData.streakStats
    // @ts-expect-error: Nested userDetails structure
    githubData = githubData.userDetails.userDetails

    const handleExportToPng = useCallback(() => {
        if (componentRef.current === null) {
            return
        }

        toPng(componentRef.current, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
                console.log('2');

            })
            .catch((err) => {
                console.log(err)
            })
    }, [componentRef])

    const handleExportToJpeg = useCallback(() => {
        console.log('1');

        if (componentRef.current === null) {
            return
        }

        toJpeg(componentRef.current, { cacheBust: true, quality: 1, pixelRatio: 2, backgroundColor: '#e8e8e8' })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.jpeg'
                link.href = dataUrl
                link.click()
                console.log('2');

            })
            .catch((err) => {
                console.log(err)
            })
    }, [componentRef])

    return (
        <React.Fragment>
            <div ref={componentRef} className='p-10'>
                <div className="h-164 w-264 mt-6 p-2  rounded-3xl" style={{
                    background: `linear-gradient(to bottom right, ${colorPallete[4]}, ${colorPallete[2]}, ${colorPallete[4]})`,
                    boxShadow: `0px 10px 20px -3px ${colorPallete[3]}`,
                    color: `${colorPallete.textColor}`

                }}>
                    <div className="h-full w-full rounded-2xl bg-[#e8e8e8] flex flex-col p-2">

                        {/* upper section */}
                        <div className="h-7/10 w-full mb-2 rounded-t-2xl flex">

                            {/* profile section and stats */}
                            <div className="w-8/10 rounded-tl-2xl mr-2 pb-2">

                                {/* upper section */}
                                <div className="w-full h-1/2 flex justify-between">
                                    <div className="w-1/6 mr-2 flex flex-col items-center">
                                        <img src="https://avatars.githubusercontent.com/u/113491469?v=4" alt="" className="w-full rounded-2xl" crossOrigin="anonymous" />
                                        <img src={`${corsProxy}https://i.pinimg.com/736x/b4/2b/04/b42b04d2a5511ada786bd0a25f3b8eff.jpg`} alt="" className="h-full w-full mt-2 rounded-xl object-cover" crossOrigin="anonymous" />
                                    </div>
                                    <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[1]}` }}>
                                        {/* personal details */}
                                        <h1 className="text-2xl font-[ChivoMedium]">{githubData.name} <span className="text-sm font-[ChivoRegular]">{ }</span></h1>
                                        {/* help */}
                                        <h1 className="text-lg font-[ChivoRegular]">@{githubData.username}</h1>
                                        <h1 className="h-1/2 text-xs font-[ChivoRegular] mt-4">{githubData.bio}</h1>
                                    </div>

                                    {/* place, time, followers */}
                                    <div className="w-2/6 h-full ml-2 flex flex-col">
                                        <div className="flex h-1/2">
                                            <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col w-full" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center "><LucideMapPinHouse className="h-4 w-4 mr-1" />Location</h1>
                                                <h1 className="text-sm pt-2 font-[ChivoMedium] ">
                                                    {githubData.location}
                                                </h1>
                                            </div>
                                            <div className="rounded-xl p-4 mb-2 w-full" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"><LucideFolderGit className="h-4 w-4 mr-1" />Repos</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {githubData.totalRepositories}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex h-1/2">
                                            <div className="h-full rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"> <LucideUser className="h-4 w-4 mr-1" />Followers</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {githubData.followersCount}
                                                </h1>
                                            </div>
                                            <img src={`${corsProxy}https://i.pinimg.com/736x/82/c7/cd/82c7cd0e29580258d17d00a3512da26b.jpg`} alt="" className="rounded-xl h-full w-full object-cover" crossOrigin="anonymous" />
                                        </div>
                                    </div>
                                    <div className="w-1/6 h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[3]}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
                                        <h1 className="w-full mt-4 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideFlame className="h-12 w-12 mb-2" />{streakStats.currentStreak}</h1>
                                        {/* help */}
                                    </div>
                                </div>

                                {/* lower section */}
                                <div className="w-full h-1/2 flex mt-2">
                                    <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[3]}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
                                        <h1 className="w-full mt-8 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideCalendar className="h-12 w-12 mb-2" />{streakStats.longestStreak}</h1>
                                        {/* help */}
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideGitCommit className="h-6 w-6 mr-1" />Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{githubData.totalCommits}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"> <LucideGitPullRequest className="h-6 w-6 mr-1" />PRs</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{githubData.pullRequestsCount}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideStar className="h-6 w-6 mr-1" />Total Stars</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{githubData.totalStars}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin] items-center">  <LucideGitCommitVertical className="h-6 w-6 mr-1" />Total Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{streakStats.totalContributions}</h1>
                                        </div>
                                    </div>

                                    <div className="w-2/5 flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${colorPallete[1]}` }}>
                                        <h1 className="w-full flex font-[ChivoThin] text-base"><LucideGitBranch className="h-6 w-6 mr-1" />Total Contribution and Orgs</h1>
                                        <div className="h-full flex mt-4">
                                            <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                                                {githubData.contributedReposCount}
                                            </h1>
                                            <div className="w-3/4 flex flex-col justify-between">
                                                {githubData.contributedOrganizations && githubData.contributedOrganizations.map((org) => (
                                                    <div key={org.name} className="flex items-center">
                                                        <img src={`${org.avatarUrl}`} alt={org.name} className="w-6 h-6 mr-2 rounded-full" crossOrigin="anonymous" />
                                                        <span className="font-[ChivoRegular] text-base">{org.name}</span>
                                                    </div>
                                                ))}
                                                <LucideEllipsis className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <img src={`${corsProxy}https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg`} alt="" className="w-2/10 h-full rounded-xl object-cover" crossOrigin="anonymous" />
                        </div>

                        {/* github calender */}
                        <div className="h-3/10 w-full rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${colorPallete[4]}` }}>
                            <GithubGraph username="benedicti0n" blockMargin={4} colorPallete={['#fff', colorPallete[1], colorPallete[2], colorPallete[3], colorPallete[4]]} />
                        </div>
                    </div>

                </div>
            </div>


            <div className='w-full flex justify-center items-center'>
                <div className='mx-2'>
                    <Button text='Export As JPEG' onClickFunction={handleExportToJpeg} icon={<LucideFileImage />} />
                </div>
                <div className='mx-2'>
                    <Button text="Export As PNG" onClickFunction={handleExportToPng} icon={<LucideImage />} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default GithubBento;