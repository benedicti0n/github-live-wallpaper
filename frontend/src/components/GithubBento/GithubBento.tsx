import { toJpeg, toPng } from 'html-to-image';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { UserDetails } from './types';
import GithubGraph from "../GithubGraph";
import { earthTonesPalette } from "./ColorHues";
import {
    LucideCalendar, LucideEllipsis, LucideFlame, LucideGitBranch, LucideGitCommit,
    LucideGitPullRequest, LucideMapPinHouse, LucideStar, LucideUser,
    LucideFileImage, LucideImage, LucideFolderGit, LucideGitCommitVertical
} from "lucide-react";
import Button from '../ui/Button';

const colorPallete = earthTonesPalette;

// List of reliable CORS proxies - if one fails, try the next
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy?quest=',
    'https://corsproxy.io/?'
];

const GithubBento = ({ githubData }: { githubData: UserDetails }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [loadedImages, setLoadedImages] = useState<{ [key: string]: string }>({});
    const [currentProxyIndex, setCurrentProxyIndex] = useState(0);

    // @ts-expect-error: Nested userDetails structure
    const streakStats = githubData.streakStats;
    // @ts-expect-error: Nested userDetails structure
    const userStats = githubData.userDetails;

    // Function to try loading image with different proxies
    const getBase64FromUrl = async (originalUrl: string): Promise<string> => {
        let lastError;

        for (let i = currentProxyIndex; i < CORS_PROXIES.length; i++) {
            try {
                const proxyUrl = CORS_PROXIES[i] + encodeURIComponent(originalUrl);
                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob();

                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                lastError = error;
                continue;
            }
        }

        console.error('All proxies failed:', lastError);
        return '';
    };

    // Modified loadImages function to handle GitHub avatar URLs differently
    const loadImages = async () => {
        const imagesToLoad = {
            decorative: [
                'https://i.pinimg.com/736x/b4/2b/04/b42b04d2a5511ada786bd0a25f3b8eff.jpg',
                'https://i.pinimg.com/736x/82/c7/cd/82c7cd0e29580258d17d00a3512da26b.jpg',
                'https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg'
            ],
            github: [
                userStats.avatarUrl,
                ...(userStats.contributedOrganizations?.map(org => org.avatarUrl) || [])
            ]
        };

        const loadedImageData: { [key: string]: string } = {};

        // Load GitHub images directly (they should have CORS headers)
        await Promise.all(
            imagesToLoad.github.map(async (url) => {
                if (url) {
                    try {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        loadedImageData[url] = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result as string);
                            reader.readAsDataURL(blob);
                        });
                    } catch (error) {
                        console.error('Error loading GitHub image:', url, error);
                    }
                }
            })
        );

        // Load decorative images through proxy
        await Promise.all(
            imagesToLoad.decorative.map(async (url) => {
                if (url) {
                    try {
                        const base64 = await getBase64FromUrl(url);
                        if (base64) {
                            loadedImageData[url] = base64;
                        }
                    } catch (error) {
                        console.error('Error loading decorative image:', url, error);
                    }
                }
            })
        );

        setLoadedImages(loadedImageData);
    };

    useEffect(() => {
        loadImages();
    }, [userStats]);

    const handleExport = useCallback(async (type: 'png' | 'jpeg') => {
        if (!componentRef.current) return;

        const options = {
            cacheBust: true,
            pixelRatio: 2,
            quality: 1,
            backgroundColor: '#e8e8e8',
            filter: (node: HTMLElement) => {
                if (node.tagName === 'IMG') {
                    const imgNode = node as HTMLImageElement;
                    const originalSrc = imgNode.getAttribute('data-original-src') || imgNode.src;
                    if (loadedImages[originalSrc]) {
                        imgNode.src = loadedImages[originalSrc];
                    }
                }
                return true;
            }
        };

        try {
            const dataUrl = await (type === 'png' ? toPng(componentRef.current, options) : toJpeg(componentRef.current, options));
            const link = document.createElement('a');
            link.download = `github-bento.${type}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(`Error exporting as ${type}:`, err);
        }
    }, [componentRef, loadedImages]);

    // Image component with fallback and original source tracking
    const Image = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
        <img
            src={loadedImages[src] || src}
            data-original-src={src}
            alt={alt}
            className={className}
            crossOrigin="anonymous"
        />
    );
    return (
        <React.Fragment>
            <div ref={componentRef} className='p-10'>
                <div className="h-164 w-264 mt-6 p-2 rounded-3xl" style={{
                    background: `linear-gradient(to bottom right, ${colorPallete.main4}, ${colorPallete.main2}, ${colorPallete.main4})`,
                    boxShadow: `0px 10px 20px -3px ${colorPallete.main3}`,
                    color: `${colorPallete.textColor}`
                }}>
                    <div className="h-full w-full rounded-2xl flex flex-col p-2"
                        style={{ background: `${colorPallete.bgColor}` }}>

                        {/* upper section */}
                        <div className="h-7/10 w-full mb-2 rounded-t-2xl flex">

                            {/* profile section and stats */}
                            <div className="w-8/10 rounded-tl-2xl mr-2 pb-2">

                                {/* upper section */}
                                <div className="w-full h-1/2 flex justify-between">
                                    <div className="w-1/6 mr-2 flex flex-col items-center">
                                        <img src={`${userStats.avatarUrl}`} alt="" className="w-full rounded-2xl" crossOrigin="anonymous" />
                                        <Image src={`https://i.pinimg.com/736x/b4/2b/04/b42b04d2a5511ada786bd0a25f3b8eff.jpg`} alt="" className="h-full w-full mt-2 rounded-xl object-cover" />
                                    </div>
                                    <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main1}` }}>
                                        {/* personal details */}
                                        <h1 className="text-2xl font-[ChivoMedium]">{userStats.name} <span className="text-sm font-[ChivoRegular]">{ }</span></h1>
                                        {/* help */}
                                        <h1 className="text-lg font-[ChivoRegular]">@{userStats.username}</h1>
                                        <h1 className="h-1/2 text-xs font-[ChivoRegular] mt-4">{userStats.bio}</h1>
                                    </div>

                                    {/* place, time, followers */}
                                    <div className="w-2/6 h-full ml-2 flex flex-col">
                                        <div className="flex h-1/2">
                                            <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col w-full" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center "><LucideMapPinHouse className="h-4 w-4 mr-1" />Location</h1>
                                                <h1 className="text-sm pt-2 font-[ChivoMedium] ">
                                                    {userStats.location}
                                                </h1>
                                            </div>
                                            <div className="rounded-xl p-4 mb-2 w-full" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"><LucideFolderGit className="h-4 w-4 mr-1" />Repos</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {userStats.totalRepositories}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex h-1/2">
                                            <div className="h-full rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"> <LucideUser className="h-4 w-4 mr-1" />Followers</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {userStats.followersCount}
                                                </h1>
                                            </div>
                                            <Image src={`https://i.pinimg.com/736x/82/c7/cd/82c7cd0e29580258d17d00a3512da26b.jpg`} alt="" className="rounded-xl h-full w-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="w-1/6 h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main3}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
                                        <h1 className="w-full mt-4 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideFlame className="h-12 w-12 mb-2" />{streakStats.currentStreak}</h1>
                                        {/* help */}
                                    </div>
                                </div>

                                {/* lower section */}
                                <div className="w-full h-1/2 flex mt-2">
                                    <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main3}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
                                        <h1 className="w-full mt-8 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideCalendar className="h-12 w-12 mb-2" />{streakStats.longestStreak}</h1>
                                        {/* help */}
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideGitCommit className="h-6 w-6 mr-1" />Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.totalCommits}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"> <LucideGitPullRequest className="h-6 w-6 mr-1" />PRs</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.pullRequestsCount}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideStar className="h-6 w-6 mr-1" />Total Stars</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.totalStars}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete.main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin] items-center">  <LucideGitCommitVertical className="h-6 w-6 mr-1" />Total Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{streakStats.totalContributions}</h1>
                                        </div>
                                    </div>

                                    <div className="w-2/5 flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${colorPallete.main1}` }}>
                                        <h1 className="w-full flex font-[ChivoThin] text-base"><LucideGitBranch className="h-6 w-6 mr-1" />Total Contribution and Orgs</h1>
                                        <div className="h-full flex mt-4">
                                            <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                                                {userStats.contributedReposCount}
                                            </h1>
                                            <div className="w-3/4 flex flex-col">
                                                {userStats.contributedOrganizations && userStats.contributedOrganizations.map((org) => (
                                                    <div key={org.name} className="flex mb-4">
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

                            <Image src="https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg" alt="" className="w-2/10 h-full rounded-xl object-cover" />
                        </div>

                        {/* github calender */}
                        <div className="h-3/10 w-full rounded-xl flex justify-center items-center font-[ChivoRegular] pb-2" >
                            <Image src="https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg" alt="" className="h-full rounded-xl object-cover mr-2" />
                            <div className="h-full w-full rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${colorPallete.main4}` }}>
                                <GithubGraph username={userStats.username} blockMargin={4} colorPallete={[colorPallete.githubHeatmap[0], colorPallete.githubHeatmap[1], colorPallete.githubHeatmap[2], colorPallete.githubHeatmap[3], colorPallete.githubHeatmap[4]]} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className='w-full flex justify-center items-center'>
                <div className='mx-2'>
                    <Button text='Export As JPEG' onClickFunction={() => handleExport("jpeg")} icon={<LucideFileImage />} />
                </div>
                <div className='mx-2'>
                    <Button text="Export As PNG" onClickFunction={() => handleExport("png")} icon={<LucideImage />} />
                </div>
            </div>
        </React.Fragment >
    );
};

export default GithubBento;