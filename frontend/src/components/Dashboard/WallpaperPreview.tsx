import { atom, useAtom } from "jotai"
import MiniButton from "../ui/MiniButton"

import { LucidePen, LucideTrash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const modalOpen = atom<boolean>(false)
const wallpaperId = '1'

const PreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="fixed inset-0 z-50 bg-white/30 bg-opacity-75 flex justify-center items-center">
            <div
                className="w-1/2 h-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
        </div>
    )
}

const WallpaperPreview = ({ imageUrl }: { imageUrl: string }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useAtom(modalOpen)

    const previewWallpaper = () => {
        setIsModalOpen((prev) => !prev)
    }

    return (
        <div className="border-2 w-72 h-40 rounded-xl relative mr-6">
            <img src={`${imageUrl}`} alt={`${imageUrl}`} className="bg-cover bg-center bg-no-repeat rounded-lg w-full h-full" onClick={previewWallpaper} />
            <div className="absolute top-0 right-0 m-1 z-10">
                <MiniButton variant="default" className="mx-1" onClickFunction={() => { navigate(`/edit/${wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton variant="destructive"><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>

            {isModalOpen && <PreviewModal imageUrl={imageUrl} />}
        </div>
    )
}

export default WallpaperPreview