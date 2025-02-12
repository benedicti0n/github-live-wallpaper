import { useNavigate } from "react-router-dom";
import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";

interface IPlatfromDetails {
    platform: string;
}

const AvailableWallpaper = (props: IPlatfromDetails) => {
    const navigate = useNavigate()
    const platfrom = props.platform.toLowerCase()

    const wallpapers = [
        "https://i.pinimg.com/236x/d4/6c/9c/d46c9c161992cce2dd47bda5256f9a02.jpg"
    ];

    return (
        <div className="h-full w-full rounded-2xl py-2 mt-2 flex items-center relative">
            {wallpapers && wallpapers.map((url, index) => (
                <WallpaperPreview key={index} imageUrl={url} />
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
