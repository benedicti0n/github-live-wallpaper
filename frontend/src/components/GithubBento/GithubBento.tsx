import React, { useRef, useCallback, useState } from 'react';
import { useClerk, useSession } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'

import { toJpeg, toPng } from 'html-to-image';
import { UserDetails } from './types';
import GithubGraph from "../GithubGraph";
import { coolBluePalette, earthTonesPalette, forestGreenPalette, vividPurplePalette, warmSunsetPalette } from "./ColorHues";
import {
    LucideCalendar, LucideEllipsis, LucideFlame, LucideGitBranch, LucideGitCommit,
    LucideGitPullRequest, LucideMapPinHouse, LucideStar, LucideUser,
    LucideFileImage, LucideImage, LucideFolderGit, LucideGitCommitVertical,
    LucideChrome,
    LucideDownload,
    LucideShare,
} from "lucide-react";
import Button from '../ui/Button';

const colorPallete = {
    earthTones: earthTonesPalette,
    coolBlue: coolBluePalette,
    forestGreen: forestGreenPalette,
    vividPurple: vividPurplePalette,
    warmSunset: warmSunsetPalette
};

type ColorPaletteType = keyof typeof colorPallete;

interface ImageUploadState {
    TopLeft: string;
    TopRight: string;
    RightSide: string;
    BottomLeft: string;
    Background: string;
}

// List of reliable CORS proxies - if one fails, try the next
// const CORS_PROXIES = [
//     'https://api.allorigins.win/raw?url=',
//     'https://api.codetabs.com/v1/proxy?quest=',
//     'https://corsproxy.io/?'
// ];

const GithubBento = ({ githubData }: { githubData: UserDetails }) => {
    const navigate = useNavigate()
    const componentRef = useRef<HTMLDivElement>(null);
    const { session, isSignedIn } = useSession()
    const { openSignIn } = useClerk()

    const [selectedPalette, setSelectedPalette] = useState<ColorPaletteType>('earthTones');
    const [loadedImages] = useState<{ [key: string]: string }>({});
    const [customImages, setCustomImages] = useState<ImageUploadState>({
        TopLeft: '',
        TopRight: '',
        RightSide: '',
        BottomLeft: '',
        Background: '',
    });
    const [imageUrls, setImageUrls] = useState<ImageUploadState>({
        TopLeft: '',
        TopRight: '',
        RightSide: '',
        BottomLeft: '',
        Background: ''
    });
    const [selectedPosition, setSelectedPosition] = useState<keyof ImageUploadState>('TopLeft');

    // @ts-expect-error: Nested userDetails structure
    const streakStats = githubData.streakStats;
    // @ts-expect-error: Nested userDetails structure
    const userStats = githubData.userDetails;

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, position: keyof ImageUploadState) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    setCustomImages(prev => ({
                        ...prev,
                        [position]: result
                    }));
                    // Clear the URL input for this position
                    setImageUrls(prev => ({
                        ...prev,
                        [position]: ''
                    }));
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleImageUrlInput = (event: React.ChangeEvent<HTMLInputElement>, position: keyof ImageUploadState) => {
        const url = event.target.value;
        setImageUrls(prev => ({
            ...prev,
            [position]: url
        }));
        if (url) {
            setCustomImages(prev => ({
                ...prev,
                [position]: url
            }));
        } else {
            setCustomImages(prev => ({
                ...prev,
                [position]: ''
            }));
        }
    };

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
    const ImageUploadSection = ({ position }: { position: keyof ImageUploadState }) => (
        <>{
            customImages[position] ? (
                <img
                    src={customImages[position].startsWith('data:') ?
                        customImages[position] :
                        `https://api.allorigins.win/raw?url=${encodeURIComponent(customImages[position])}`
                    }
                    alt={position}
                    className="h-full w-full object-cover rounded-xl"
                    crossOrigin="anonymous"
                    onError={(e) => {
                        console.error('Error loading image:', e);
                        setCustomImages(prev => ({
                            ...prev,
                            [position]: ''
                        }));
                    }}
                />
            ) : (
                <div className="bg-gray-200 w-full h-full flex text-center items-center justify-center rounded-xl border-2 border-dashed"
                    style={{ backgroundColor: `${colorPallete[selectedPalette].main1}`, borderColor: `${colorPallete[selectedPalette].main4}` }}>
                    <span className="w-full text-sm font-[ChivoRegular]">{position}</span>
                </div>
            )}
        </>
    );

    return (
        <React.Fragment>
            <div className='flex items-center justify-center p-2 rounded-3xl mt-6 w-264 mb-6 ' style={{
                background: `linear-gradient(to bottom right, ${colorPallete[selectedPalette].main4}, ${colorPallete[selectedPalette].main2}, ${colorPallete[selectedPalette].main4})`,
                boxShadow: `0px 10px 20px -3px ${colorPallete[selectedPalette].main3}`,
                color: `${colorPallete[selectedPalette].textColor}`
            }}>
                <div className="w-full p-6 rounded-2xl bg-gray-100 shadow-lg flex gap-6" style={{ background: `${colorPallete[selectedPalette].bgColor}` }}>


                    {/* Color Palette Selection */}
                    <div className="w-1/2 font-[ChivoRegular]">
                        <label className="text-xl font-[ChivoMedium] block mb-2 invert">Select Color Palette:</label>
                        <select
                            value={selectedPalette}
                            onChange={(e) => setSelectedPalette(e.target.value as ColorPaletteType)}
                            className="p-2 border rounded-lg w-full shadow-sm invert"
                        >
                            <option value="earthTones">Earth Tones</option>
                            <option value="coolBlue">Cool Blue</option>
                            <option value="forestGreen">Forest Green</option>
                            <option value="vividPurple">Vivid Purple</option>
                            <option value="warmSunset">Warm Sunset</option>
                        </select>
                    </div>

                    {/* Image Upload Section */}
                    <div className="w-1/2 p-5 rounded-xl shadow-md font-[ChivoRegular]" style={{ background: `${colorPallete[selectedPalette].main1}`, color: `${colorPallete[selectedPalette].textColor}` }}>
                        <h3 className="text-xl font-[ChivoMedium] font-semibold mb-4">Upload Images</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-2">Select Image Position:</label>
                                <select
                                    value={selectedPosition}
                                    onChange={(e) => setSelectedPosition(e.target.value as keyof ImageUploadState)}
                                    className="w-full p-2 border rounded-lg shadow-sm"
                                >
                                    <option value="TopLeft">Top Left</option>
                                    <option value="TopRight">Top Right</option>
                                    <option value="RightSide">Right Side</option>
                                    <option value="BottomLeft">Bottom Left</option>
                                    <option value="Background">Background</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium block mb-2">Upload an Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, selectedPosition)}
                                    className="w-full p-2 border rounded-lg shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium block mb-2">Or Enter Image URL:</label>
                                <input
                                    type="text"
                                    value={imageUrls[selectedPosition]}
                                    placeholder="Paste image URL here..."
                                    onChange={(e) => handleImageUrlInput(e, selectedPosition)}
                                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div ref={componentRef} className='h-screen w-full flex items-center justify-center px-10 pb-10 pt-3' style={{
                backgroundImage: customImages.Background ?
                    `url(${customImages.Background.startsWith('data:') ?
                        customImages.Background :
                        `https://api.allorigins.win/raw?url=${encodeURIComponent(customImages.Background)}`
                    })` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderWidth: customImages.Background ? 'none' : '2px',
                borderStyle: customImages.Background ? "none" : "dashed",
                borderColor: `${colorPallete[selectedPalette].main4}`,
                borderRadius: customImages.Background ? "0px" : "1.5rem"
            }}>
                <div className="h-164 w-264 mt-6 p-2 rounded-3xl" style={{
                    background: `linear-gradient(to bottom right, ${colorPallete[selectedPalette].main4}, ${colorPallete[selectedPalette].main2}, ${colorPallete[selectedPalette].main4})`,
                    boxShadow: `0px 10px 20px -3px ${colorPallete[selectedPalette].main3}`,
                    color: `${colorPallete[selectedPalette].textColor}`
                }}>
                    <div className="h-full w-full rounded-2xl flex flex-col p-2"
                        style={{ background: `${colorPallete[selectedPalette].bgColor}` }}>

                        {/* upper section */}
                        <div className="h-7/10 w-full mb-2 rounded-t-2xl flex">

                            {/* profile section and stats */}
                            <div className="w-8/10 rounded-tl-2xl mr-2 pb-2">

                                {/* upper section */}
                                <div className="w-full h-1/2 flex justify-between">
                                    <div className="w-1/6 mr-2 flex flex-col items-center">
                                        <img src={`${userStats.avatarUrl}`} alt="" className="w-full rounded-2xl mb-2" crossOrigin="anonymous" />
                                        <ImageUploadSection position="TopLeft" />
                                    </div>
                                    <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main1}` }}>
                                        {/* personal details */}
                                        <h1 className="text-2xl font-[ChivoMedium]">{userStats.name} <span className="text-sm font-[ChivoRegular]">{ }</span></h1>
                                        {/* help */}
                                        <h1 className="text-lg font-[ChivoRegular]">@{userStats.username}</h1>
                                        <h1 className="h-1/2 text-xs font-[ChivoRegular] mt-4">{userStats.bio}</h1>
                                    </div>

                                    {/* place, time, followers */}
                                    <div className="w-2/6 h-full ml-2 flex flex-col">
                                        <div className="flex h-1/2">
                                            <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col w-full" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center "><LucideMapPinHouse className="h-4 w-4 mr-1" />Location</h1>
                                                <h1 className="text-sm pt-2 font-[ChivoMedium] ">
                                                    {userStats.location}
                                                </h1>
                                            </div>
                                            <div className="rounded-xl p-4 mb-2 w-full" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"><LucideFolderGit className="h-4 w-4 mr-1" />Repos</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {userStats.totalRepositories}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex h-1/2">
                                            <div className="h-full rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                                <h1 className="w-full flex text-sm font-[ChivoThin] items-center"> <LucideUser className="h-4 w-4 mr-1" />Followers</h1>
                                                <h1 className="text-xl pt-2 font-[ChivoMedium]">
                                                    {userStats.followersCount}
                                                </h1>
                                            </div>
                                            <ImageUploadSection position="TopRight" />
                                        </div>
                                    </div>
                                    <div className="w-1/6 h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main3}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
                                        <h1 className="w-full mt-4 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideFlame className="h-12 w-12 mb-2" />{streakStats.currentStreak}</h1>
                                        {/* help */}
                                    </div>
                                </div>

                                {/* lower section */}
                                <div className="w-full h-1/2 flex mt-2">
                                    <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main3}` }}>
                                        <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
                                        <h1 className="w-full mt-8 flex flex-col justify-center items-center font-[ChivoMedium] text-5xl"><LucideCalendar className="h-12 w-12 mb-2" />{streakStats.longestStreak}</h1>
                                        {/* help */}
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideGitCommit className="h-6 w-6 mr-1" />Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.totalCommits}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"> <LucideGitPullRequest className="h-6 w-6 mr-1" />PRs</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.pullRequestsCount}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin]"><LucideStar className="h-6 w-6 mr-1" />Total Stars</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{userStats.totalStars}</h1>
                                        </div>
                                        <div className="rounded-xl p-4" style={{ backgroundColor: `${colorPallete[selectedPalette].main2}` }}>
                                            <h1 className="w-full flex text-sm font-[ChivoThin] items-center">  <LucideGitCommitVertical className="h-6 w-6 mr-1" />Total Commits</h1>
                                            <h1 className="text-lg pt-2 font-[ChivoMedium]">{streakStats.totalContributions}</h1>
                                        </div>
                                    </div>

                                    <div className="w-2/5 flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${colorPallete[selectedPalette].main1}` }}>
                                        <h1 className="w-full flex font-[ChivoThin] text-base"><LucideGitBranch className="h-6 w-6 mr-1" />Total Contribution and Orgs</h1>
                                        <div className="h-full flex mt-4">
                                            <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                                                {userStats.contributedReposCount}
                                            </h1>
                                            <div className="w-3/4 flex flex-col">
                                                {userStats.contributedOrganizations && userStats.contributedOrganizations.map((org: { name: string, avatarUrl: string }) => (
                                                    <div key={org.name} className="flex mb-4">
                                                        <img src={`${org.avatarUrl}`} alt={org.name} className="w-6 h-6 mr-2 rounded-full" crossOrigin="anonymous" />
                                                        <span className="font-[ChivoRegular] text-sm">{org.name}</span>
                                                    </div>
                                                ))}
                                                <LucideEllipsis className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/10 h-full flex'>
                                <ImageUploadSection position="RightSide" />
                            </div>
                        </div>

                        {/* github calender */}
                        <div className="h-3/10 w-full rounded-xl flex justify-center items-center font-[ChivoRegular]" >
                            <div className='w-1/10 h-full mr-2'>
                                <ImageUploadSection position="BottomLeft" />
                            </div>
                            <div className="h-full w-9/10 rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${colorPallete[selectedPalette].main4}` }}>
                                <GithubGraph username={userStats.username} blockMargin={4} colorPallete={[colorPallete[selectedPalette].githubHeatmap[0], colorPallete[selectedPalette].githubHeatmap[1], colorPallete[selectedPalette].githubHeatmap[2], colorPallete[selectedPalette].githubHeatmap[3], colorPallete[selectedPalette].githubHeatmap[4]]} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className='w-full flex justify-center items-center mt-6'>
                <div className='mx-2'>
                    <Button text='Share' onClickFunction={() => {
                        if (isSignedIn) {
                            navigate(`/preview/${userStats.username}`)
                        } else {
                            openSignIn()
                        }
                    }} icon={<LucideShare />} />
                </div>
                <div className='mx-2'>
                    <Button text='Export As JPEG' onClickFunction={() => handleExport("jpeg")} icon={<LucideFileImage />} />
                </div>
                <div className='mx-2'>
                    <Button text="Export As PNG" onClickFunction={() => handleExport("png")} icon={<LucideImage />} />
                </div>
                <div className='mx-2'>
                    <Button text="Set in Browser Home Tab" onClickFunction={() => { }} icon={<LucideChrome />} />
                </div>
                <div className='mx-2'>
                    <Button text={`Download the Win/Mac App`} onClickFunction={() => { }} icon={<LucideDownload />} />
                </div>
            </div>
        </React.Fragment >
    );
};

export default GithubBento;