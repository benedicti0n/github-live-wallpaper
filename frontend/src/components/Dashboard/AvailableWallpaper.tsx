import MiniButton from "../ui/MiniButton"
import WallpaperPreview from "./WallpaperPreview"

import { LucidePlus } from "lucide-react"

const AvailableWallpaper = () => {
    return (
        <div className="w-full rounded-2xl py-2 mt-2 flex justify-between items-center">
            <WallpaperPreview />
            <div>
                <MiniButton variant="default"><LucidePlus className="h-4 w-4" /></MiniButton>
            </div>
        </div>
    )
}

export default AvailableWallpaper