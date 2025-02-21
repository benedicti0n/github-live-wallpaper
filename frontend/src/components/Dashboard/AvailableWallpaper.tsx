import { useNavigate } from "react-router-dom";
import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

interface IPlatfromDetails {
    platform: string;
    wallpapers: [{
        wallpaperId: string,
        link: string,
    }] | undefined;
}

const AvailableWallpaper = (props: IPlatfromDetails) => {
    const navigate = useNavigate()
    const platform = props.platform.toLowerCase()

    const { user } = useUser();
    const userId = user?.id;

    return (
        <div className="h-full w-full rounded-2xl py-2 mt-2 flex items-center relative">
            {props.wallpapers && props.wallpapers
                .filter(wallpaper => wallpaper.wallpaperId && wallpaper.link[0])
                .map((wallpaper) => (
                    <WallpaperPreview key={wallpaper.wallpaperId} wallpaperId={wallpaper.wallpaperId} imageUrl={wallpaper.link[0]} platformOf={platform} userId={userId} />
                ))}
            <div className="h-full flex justify-center items-center">
                <MiniButton variant="default" onClickFunction={() => navigate(`/${platform}/create`)}>
                    <LucidePlus className="h-6 w-6" />
                </MiniButton>
            </div>
        </div>
    );
};

export default AvailableWallpaper;
