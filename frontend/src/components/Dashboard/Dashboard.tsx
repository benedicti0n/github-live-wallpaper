import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import Navbar from "../Navbar"
import ConnectedPlatform from "./ConnectedPlatform"
import Section from "./Section"

const serverUrl = import.meta.env.VITE_SERVER_URL;
interface IWallpapers {
    extension: [{
        wallpaperId: string,
        link: string,
    }];
    mobile: [{
        wallpaperId: string,
        link: string,
    }];
    desktop: [{
        wallpaperId: string,
        link: string,
    }];
}

const Dashboard = () => {
    const { user } = useUser()
    const userId = user?.id

    const [wallpapers, setUseWallpapers] = useState<IWallpapers>()

    const fetchPreviewWallpapers = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/v1/wallpaper/fetchPreviewWallpapers`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setUseWallpapers(data.wallpapers)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPreviewWallpapers()
    }, [])
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center relative">
            <Navbar />
            <div className="w-3/4 h-full flex flex-col justify-center items-center mt-5">
                <div className="h-full w-full flex flex-col">
                    <Section heading="Extension" wallpapers={wallpapers?.extension} />
                    <Section heading="Mobile" wallpapers={wallpapers?.mobile} />
                    <Section heading="Desktop" wallpapers={wallpapers?.desktop} />
                    <ConnectedPlatform />
                </div>
            </div>
        </div>
    )
}

export default Dashboard