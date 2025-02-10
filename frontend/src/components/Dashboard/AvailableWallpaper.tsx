import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";

const AvailableWallpaper = () => {
    const wallpapers = [
        "https://i.pinimg.com/736x/eb/c2/2c/ebc22c2dc163f62eaa98a2e2a411653c.jpg",
        "https://i.pinimg.com/736x/eb/c2/2c/ebc22c2dc163f62eaa98a2e2a411653c.jpg",
        "https://i.pinimg.com/736x/eb/c2/2c/ebc22c2dc163f62eaa98a2e2a411653c.jpg",
    ];
    return (
        <div className="w-full rounded-2xl py-2 mt-2 flex items-center relative">
            {wallpapers.map((url, index) => (
                <WallpaperPreview key={index} imageUrl={url} />
            ))}
            <div className="h-full flex justify-center items-center">
                <MiniButton variant="default">
                    <LucidePlus className="h-6 w-6" />
                </MiniButton>
            </div>
        </div>
    );
};

export default AvailableWallpaper;
