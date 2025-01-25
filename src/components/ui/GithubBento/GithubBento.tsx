import GithubGraph from "../../GithubGraph";
import "./GithubBento.css"
import { data } from "./Data";

const GithubBento = () => {
    return (
        <div className="h-132 w-232 mt-6 p-2 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60  rounded-3xl">
            <div className="h-full w-full rounded-2xl bg-white flex flex-col">

                {/* upper section */}
                <div className="h-6/10 w-full bg-amber-400 mb-2 rounded-t-2xl flex">

                    {/* profile section and stats */}
                    <div className="w-8/10 bg-pink-500 rounded-tl-2xl mr-2 p-2">

                        {/* upper section */}
                        <div className="w-full h-1/2 bg-blue-200 flex justify-between">
                            <div className="w-1/6 mr-2">
                                <img src={data.profilePic} alt="" className="w-full h-full" />
                            </div>
                            <div className="w-2/6 bg-pink-200">
                                {/* personal details */}
                                <div className="h-1/2 border-2 border-black">
                                    <h1 className="text-2xl font-bold">{data.name} <span className="text-lg font-medium">{data.pronouns}</span></h1>
                                    <h1 className="text-lg font-medium">@{data.username}</h1>
                                </div>
                                <div className="h-1/2 border-2">
                                    <h1 className="text-sm">{data.bio}</h1>
                                </div>
                            </div>

                            {/* place, time, followers */}
                            <div className="w-2/6 h-full ml-2 bg-amber-200 flex flex-col">
                                <div className="flex h-1/2">
                                    <div className="border-2">{data.place}</div>
                                    <div>{data.time}</div>
                                </div>
                                <div className="border-2 h-1/2 flex justify-center items-center">
                                    Followers: {data.followers}
                                </div>
                            </div>
                            <div className="w-1/6 ml-2 bg-amber-200">
                                <h1>{data.currentStreak}</h1>
                            </div>
                        </div>

                        {/* lower section */}
                        <div className="w-full h-1/2 bg-red-300 flex mt-2 p-2">
                            <div className="w-1/5 bg-purple-400 mr-2">
                                <h1>{data.longestStreak}</h1>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 w-2/5 bg-purple-400 mr-2">
                                <div className="border-2"><h1>{data.commits}</h1></div>
                                <div className="border-2"><h1>{data.totalPRs}</h1></div>
                                <div className="border-2"><h1>{data.totalStars}</h1></div>
                                <div className="border-2"><h1>{data.totalCommits}</h1></div>
                            </div>
                            <div className="w-2/5 bg-purple-400 flex">
                                <h1 className="w-1/4 border-2">{data.contributedTo.number}</h1>
                                <div className="w-3/4 flex flex-col justify-between">
                                    {data.contributedTo.orgs.map((org) => (
                                        <div key={org.orgName} className="flex items-center">
                                            <img src={org.orgLogo} alt={org.orgName} className="w-8 h-8 mr-2" />
                                            <span>{org.orgName}</span>
                                        </div>
                                    ))}
                                    <h1>and more...</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/10 bg-pink-500 rounded-tr-2xl p-2">
                        <img src={data.wallpaper} alt="" className="h-full w-full rounded-tr-2xl" />
                    </div>
                </div>

                {/* github calender */}
                <div className="h-4/10 w-full bg-red-500 rounded-b-2xl flex justify-center items-center">
                    <GithubGraph username="benedicti0n" blockMargin={4} />
                </div>
            </div>
        </div>
    );
};

export default GithubBento;