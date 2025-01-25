import GithubGraph from "../../GithubGraph";
import { data } from "./Data";
import { BluePallete, GreenPallete, PurplePallete } from "./ColorHues";

const GithubBento = () => {
    return (
        <div className="h-164 w-232 mt-6 p-2 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60  rounded-3xl">
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
                            <div className="w-2/6 rounded-2xl p-4" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                {/* personal details */}
                                <div className="h-1/2 ">
                                    <h1 className="text-2xl font-[ChivoMedium]">{data.name} <span className="text-lg font-chivo">{data.pronouns}</span></h1>
                                    <h1 className="text-lg font-medium">@{data.username}</h1>
                                </div>
                                <div className="h-1/2">
                                    <h1 className="text-sm">{data.bio}</h1>
                                </div>
                            </div>

                            {/* place, time, followers */}
                            <div className="w-2/6 h-full ml-2 flex flex-col">
                                <div className="flex h-1/2">
                                    <div className="rounded-xl p-4 mr-2 mb-2" style={{ backgroundColor: `${GreenPallete[2]}` }}>{data.place}</div>
                                    <div className="rounded-xl p-4 mb-2" style={{ backgroundColor: `${GreenPallete[2]}` }}>{data.time}</div>
                                </div>
                                <div className="h-1/2 flex justify-center items-center rounded-xl" style={{ backgroundColor: `${GreenPallete[2]}` }}>
                                    Followers: {data.followers}
                                </div>
                            </div>
                            <div className="w-1/6 ml-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                <h1>{data.currentStreak}</h1>
                            </div>
                        </div>

                        {/* lower section */}
                        <div className="w-full h-1/2 flex mt-2">
                            <div className="w-1/5 mr-2 rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[3]}` }}>
                                <h1>{data.longestStreak}</h1>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-2/5 mr-2">
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}><h1>{data.commits}</h1></div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}><h1>{data.totalPRs}</h1></div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}><h1>{data.totalStars}</h1></div>
                                <div className="rounded-xl p-4" style={{ backgroundColor: `${GreenPallete[2]}` }}><h1>{data.totalCommits}</h1></div>
                            </div>
                            <div className="w-2/5 flex p-4 rounded-xl" style={{ backgroundColor: `${GreenPallete[1]}` }}>
                                <h1 className="
                                w-1/4 rounded-lg p-4 mr-2" style={{ backgroundColor: `${GreenPallete[3]}` }}>{data.contributedTo.number}</h1>
                                <div className="w-3/4 flex flex-col justify-between">
                                    {data.contributedTo.orgs.map((org) => (
                                        <div key={org.orgName} className="flex items-center">
                                            <img src={org.orgLogo} alt={org.orgName} className="w-8 h-8 mr-2 rounded-md" />
                                            <span>{org.orgName}</span>
                                        </div>
                                    ))}
                                    <h1>and more...</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/10 rounded-xl">
                        <img src="https://i.pinimg.com/736x/c1/5a/cd/c15acd2d344c7fb78e420c988596907a.jpg" alt="" className="h-full w-full rounded-xl object-cover" />
                    </div>
                </div>

                {/* github calender */}
                <div className="h-3/10 w-full rounded-xl flex justify-center items-center" style={{ backgroundColor: `${GreenPallete[4]}` }}>
                    <GithubGraph username="benedicti0n" blockMargin={4} />
                </div>
            </div>
        </div >
    );
};

export default GithubBento;