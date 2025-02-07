import MiniButton from "../ui/MiniButton"

import { LucidePen, LucideTrash2 } from "lucide-react"

const WallpaperPreview = () => {
    return (
        <div className="border-2 w-72 h-40 rounded-2xl relative" style={{
            backgroundImage: `url("https://i.pinimg.com/736x/cc/a8/23/cca8233929a49172720a8d40b7c62433.jpg")`, backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="absolute top-0 right-0 m-1">
                <MiniButton variant="default" className="mx-1"><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton variant="destructive"><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>
        </div>
    )
}

export default WallpaperPreview