import GithubGraph from "../../GithubGraph";
import { data } from "./data";
import { BluePallete, GreenPallete, PurplePallete } from "./ColorHues";
import { LucideCalendar, LucideClock, LucideEllipsis, LucideFlame, LucideGitBranch, LucideGitCommit, LucideGitCommitVertical, LucideGitGraph, LucideGitPullRequest, LucideMapPinHouse, LucideStar, LucideUser } from "lucide-react";

const GithubBento = () => {
    return (
        <div className="h-164 w-264 mt-6 p-2 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60  rounded-3xl">
            <div className="h-full w-full rounded-2xl bg-[#e8e8e8] flex flex-col p-2">

                {/* upper section */}
                <div className="h-7/10 w-full mb-2 rounded-t-2xl flex">

                    {/* profile section and stats */}
                    <div className="w-8/10 rounded-tl-2xl mr-2 pb-2">

                        {/* upper section */}
                        <div className="w-full h-1/2 flex justify-between">
                            <div className="w-1/6 mr-2 flex flex-col items-center">
                                <img src="https://avatars.githubusercontent.com/u/113491469?v=4" alt="" className="w-full rounded-2xl" />
                                <img src="https://i.pinimg.com/736x/b4/2b/04/b42b04d2a5511ada786bd0a25f3b8eff.jpg" alt="" className="h-full w-full mt-2 rounded-xl object-cover" />
                            </div>
                            <div className="w-2/6 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                {/* personal details */}
                                <div className="h-1/2 ">
                                    <h1 className="text-3xl font-[ChivoMedium]">{data.name} <span className="text-sm font-[ChivoRegular]">{data.pronouns}</span></h1>
                                    <h1 className="text-lg font-[ChivoRegular]">@{data.username}</h1>
                                </div>
                                <div className="h-1/2">
                                    <h1 className="text-sm font-[ChivoRegular]">{data.bio}</h1>
                                </div>
                            </div>

                            {/* place, time, followers */}
                            <div className="w-2/6 h-full ml-2 flex flex-col">
                                <div className="flex h-1/2">
                                    <div className="rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                        <div className="w-full flex text-xs font-[ChivoThin]">
                                            <LucideMapPinHouse className="h-4 w-4" />
                                            <h1 className="pl-1">Location</h1>
                                        </div>
                                        <h1 className="text-sm pt-2 font-[ChivoMedium]">
                                            {data.place}
                                        </h1>
                                    </div>
                                    <div className="rounded-xl p-4 mb-2" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                        <div className="w-full flex text-xs font-[ChivoThin]">
                                            <LucideClock className="h-4 w-4" />
                                            <h1 className="pl-1">Time</h1>
                                        </div>
                                        <h1 className="text-sm pt-2 font-[ChivoMedium]">
                                            {data.time}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex h-1/2">
                                    <div className="h-full rounded-xl p-4 mr-2 mb-2 flex flex-col" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                        <div className="w-full flex text-xs font-[ChivoThin]">
                                            <LucideUser className="h-4 w-4" />
                                            <h1 className="pl-1">Followers</h1>
                                        </div>
                                        <h1 className="text-sm pt-2 font-[ChivoMedium]">
                                            {data.followers}
                                        </h1>
                                    </div>
                                    <div className="h-full w-full rounded-xl mb-2" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                        <img src="https://i.pinimg.com/736x/82/c7/cd/82c7cd0e29580258d17d00a3512da26b.jpg" alt="" className="rounded-xl h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/6 h-full ml-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                <h1 className="font-[ChivoThin] text-base">Current Streak</h1>
                                <div className=" w-full mt-4 flex flex-col justify-center items-center">
                                    <LucideFlame className="h-12 w-12" />
                                    <h1 className="mt-2 font-[ChivoMedium] text-5xl">{data.currentStreak}</h1>
                                </div>
                            </div>
                        </div>

                        {/* lower section */}
                        <div className="w-full h-1/2 flex mt-2">
                            <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                <h1 className="font-[ChivoThin] text-base">Longest Streak</h1>
                                <div className=" w-full mt-8 flex flex-col justify-center items-center">
                                    <LucideCalendar className="h-12 w-12" />
                                    <h1 className="mt-2 font-[ChivoMedium] text-5xl">{data.longestStreak}</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                    <div className="w-full flex text-sm font-[ChivoThin]">
                                        <LucideGitCommit className="h-6 w-6" />
                                        <h1 className="pl-1">Commits</h1>
                                    </div>
                                    <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.commits}</h1>
                                </div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                    <div className="w-full flex text-sm font-[ChivoThin]">
                                        <LucideGitPullRequest className="h-6 w-6" />
                                        <h1 className="pl-1">PRs</h1>
                                    </div>
                                    <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalPRs}</h1>
                                </div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                    <div className="w-full flex text-sm font-[ChivoThin]">
                                        <LucideStar className="h-6 w-6" />
                                        <h1 className="pl-1">Total Stars</h1>
                                    </div>
                                    <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalStars}</h1>
                                </div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                    <div className="w-full flex text-sm font-[ChivoThin]">
                                        <LucideGitCommitVertical className="h-6 w-6" />
                                        <h1 className="pl-1">Total Commits</h1>
                                    </div>
                                    <h1 className="text-lg pt-2 font-[ChivoMedium]">{data.totalCommits}</h1>
                                </div>
                            </div>

                            <div className="w-2/5 flex flex-col p-4 rounded-xl" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                <div className='flex'>
                                    <LucideGitBranch className="h-6 w-6" />
                                    <h1 className="pl-1 font-[ChivoThin] text-base">Total Contribution and Orgs</h1>
                                </div>
                                <div className="h-full flex mt-4">
                                    <h1 className="w-1/4 mr-6 text-5xl font-[ChivoMedium]">
                                        {data.contributedTo.number}
                                    </h1>
                                    <div className="w-3/4 flex flex-col justify-between">
                                        {data.contributedTo.orgs.map((org) => (
                                            <div key={org.orgName} className="flex items-center">
                                                <img src={org.orgLogo} alt={org.orgName} className="w-6 h-6 mr-2" />
                                                <span className="font-[ChivoRegular] text-base">{org.orgName}</span>
                                            </div>
                                        ))}
                                        <LucideEllipsis className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/10 rounded-xl">
                        <img src="https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg" alt="" className="h-full w-full rounded-xl object-cover" />
                    </div>
                </div>

                {/* github calender */}
                <div className="h-3/10 w-full rounded-xl flex flex-col justify-center items-center font-[ChivoRegular]" style={{ backgroundColor: `${GreenPallete[4]}` }}>
                    <GithubGraph username="benedicti0n" blockMargin={4} />
                </div>
            </div>
        </div >
    );
};

export default GithubBento;