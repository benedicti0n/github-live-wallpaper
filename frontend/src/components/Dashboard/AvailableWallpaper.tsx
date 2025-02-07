import MiniButton from "../ui/MiniButton";
import WallpaperPreview from "./WallpaperPreview";
import { LucidePlus } from "lucide-react";

const AvailableWallpaper = () => {
    const wallpapers = [
        "https://i.pinimg.com/736x/cc/a8/23/cca8233929a49172720a8d40b7c62433.jpg",
        // Add more URLs as needed
    ];
    return (
        <div className="w-full rounded-2xl py-2 mt-2 flex justify-between items-center relative">
            {wallpapers.map((url, index) => (
                <WallpaperPreview key={index} imageUrl={url} />
            ))}
            <div>
                <MiniButton variant="default">
                    <LucidePlus className="h-4 w-4" />
                </MiniButton>
            </div>
        </div>
    );
};

export default AvailableWallpaper;
