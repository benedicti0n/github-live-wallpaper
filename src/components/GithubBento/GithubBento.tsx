import { toJpeg, toPng } from 'html-to-image';
import React, { useRef, useCallback } from 'react';

import GithubGraph from "../GithubGraph";
import { data } from "./data";
import { BluePallete, GreenPallete, PurplePallete } from "./ColorHues";
import { LucideCalendar, LucideClock, LucideEllipsis, LucideFlame, LucideGitBranch, LucideGitCommit, LucideGitCommitVertical, LucideGitPullRequest, LucideMapPinHouse, LucideStar, LucideUser } from "lucide-react";
import Button from '../ui/Button';

const corsProxy = "https://cors-anywhere.herokuapp.com/";

const GithubBento = () => {
    const componentRef = useRef<HTMLDivElement>(null)
    const handleExportToPng = useCallback(() => {
        console.log('1');

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
                    background: 'linear-gradient(to bottom right, #42a59f, #72e0ac, #42a59f)',
                    boxShadow: '0px 10px 15px -3px rgba(66, 165, 159, 0.6), 0px 4px 6px -2px rgba(66, 165, 159, 0.6)',

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
                                    <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                        {/* personal details */}
                                        <div className="h-1/2 ">
                                            <h1 className="text-3xl font-[ChivoMedium]">{data.name} <span className="text-sm font-[ChivoRegular]">{data.pronouns}</span></h1>
                                            <h1 className="text-lg font-[ChivoRegular]">@{data.username}</h1>
                                        </div>
                                        <h1 className="h-1/2 text-sm font-[ChivoRegular]">{data.bio}</h1>
                                    </div>

                                    {/* place, time, followers */}
                                    <div className="w-2/6 h-full ml-2 flex flex-col">
                                        <div className="flex h-1/2">
                                            <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                                <h1 className="w-full flex text-xs font-[ChivoThin] "><LucideMapPinHouse className="h-4 w-4 mr-1" />Location</h1>
                                                <h1 className="text-sm pt-2 font-[ChivoMedium]">
                                                    {data.place}
                                                </h1>
                                            </div>
                                            <div className="rounded-xl p-4 mb-2" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                                <h1 className="w-full flex text-xs font-[ChivoThin]"><LucideClock className="h-4 w-4 mr-1" />Time</h1>
                                                <h1 className="text-sm pt-2 font-[ChivoMedium]">
                                                    {data.time}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex h-1/2">
                                            <div className="h-full rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                                <h1 className="w-full flex text-xs font-[ChivoThin]"> <LucideUser className="h-4 w-4 mr-1" />Followers</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {data.followers}
                                                </h1>
                                            </div>
                                            <img src={`${corsProxy}https://i.pinimg.com/736x/82/c7/cd/82c7cd0e29580258d17d00a3512da26b.jpg`} alt="" className="rounded-xl h-full w-full object-cover" crossOrigin="anonymous" />
                                        </div>
                                    </div>
                                    <div className="w-1/6 h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
                                        <h1 className="w-full mt-4 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideFlame className="h-12 w-12 mb-2" />{data.currentStreak}</h1>
                                    </div>
                                </div>

                                {/* lower section */}
                                <div className="w-full h-1/2 flex mt-2">
                                    <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
                                        <h1 className="w-full mt-8 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideCalendar className="h-12 w-12 mb-2" />{data.longestStreak}</h1>
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideGitCommit className="h-6 w-6 mr-1" />Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.commits}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"> <LucideGitPullRequest className="h-6 w-6 mr-1" />PRs</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalPRs}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideStar className="h-6 w-6 mr-1" />Total Stars</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalStars}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]">  <LucideGitCommitVertical className="h-6 w-6 mr-1" />Total Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalCommits}</h1>
                                        </div>
                                    </div>

                                    <div className="w-2/5 flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                        <h1 className="w-full flex font-[ChivoThin] text-base"><LucideGitBranch className="h-6 w-6 mr-1" />Total Contribution and Orgs</h1>
                                        <div className="h-full flex mt-4">
                                            <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                                                {data.contributedTo.number}
                                            </h1>
                                            <div className="w-3/4 flex flex-col justify-between">
                                                {data.contributedTo.orgs.map((org) => (
                                                    <div key={org.orgName} className="flex items-center">
                                                        <img src={`${corsProxy}${org.orgLogo}`} alt={org.orgName} className="w-6 h-6 mr-2" crossOrigin="anonymous" />
                                                        <span className="font-[ChivoRegular] text-base">{org.orgName}</span>
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
                        <div className="h-3/10 w-full rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${GreenPallete[4]}` }}>
                            <GithubGraph username="benedicti0n" blockMargin={4} />
                        </div>
                    </div>

                </div>
            </div>


            <div className='w-full flex justify-center items-center border-2'>
                <div className='mx-2'>
                    <Button text='Export As JPEG' onClickFunction={handleExportToJpeg} />
                </div>
                <div className='mx-2'>
                    <Button text="Export As PNG" onClickFunction={handleExportToPng} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default GithubBento;