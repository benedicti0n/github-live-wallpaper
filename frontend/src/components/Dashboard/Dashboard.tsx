import Navbar from "../Navbar"
import ConnectedPlatform from "./ConnectedPlatform"
import Section from "./Section"

const Dashboard = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center relative">
            <Navbar />
            <div className="w-3/4 h-full flex flex-col justify-center items-center mt-5">
                <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-4">
                    <Section heading="Extension" />
                    <Section heading="Mobile" />
                    <Section heading="Desktop" />
                    <ConnectedPlatform />
                </div>
            </div>
        </div>
    )
}

export default Dashboard