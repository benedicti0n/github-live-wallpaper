import { useNavigate } from "react-router-dom";
import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";

interface IPlatfromDetails {
    platform: string;
    wallpapers: [{
        wallpaperId: string,
        link: string,
    }] | undefined;
}

const AvailableWallpaper = (props: IPlatfromDetails) => {
    const navigate = useNavigate()
    const platfrom = props.platform.toLowerCase()

    return (
        <div className="h-full w-full rounded-2xl py-2 mt-2 flex items-center relative">
            {props.wallpapers && props.wallpapers
                .filter(wallpaper => wallpaper.wallpaperId && wallpaper.link[0])
                .map((wallpaper) => (
                    <WallpaperPreview key={wallpaper.wallpaperId} imageUrl={wallpaper.link[0]} />
                ))}
            <div className="h-full flex justify-center items-center">
                <MiniButton variant="default" onClickFunction={() => navigate(`/${platfrom}/create`)}>
                    <LucidePlus className="h-6 w-6" />
                </MiniButton>
            </div>
        </div>
    );
};

export default AvailableWallpaper;
