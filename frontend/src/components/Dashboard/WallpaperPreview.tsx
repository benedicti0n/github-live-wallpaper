import { atom, useAtom } from "jotai"
import MiniButton from "../ui/MiniButton"

import { LucidePen, LucideTrash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const modalOpen = atom<boolean>(false)
const wallpaperId = '1'

const PreviewModal = ({ imageUrl, closeModal }: { imageUrl: string, closeModal: () => void }) => {
    const navigate = useNavigate()
    return (
        <div
            className="fixed inset-0 z-50 backdrop-blur-xs bg-opacity-75 flex justify-center items-center"
            onClick={closeModal}
        >
            <div className="w-2/3 h-2/3 rounded-xl relative">
                <div
                    className="w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute top-2 right-2 z-10">
                    <MiniButton variant="default" className="mx-2" onClickFunction={() => { navigate(`/edit/${wallpaperId}`) }}><LucidePen className="h-6 w-6" /></MiniButton>
                    <MiniButton variant="destructive"><LucideTrash2 className="h-6 w-6" /></MiniButton>
                </div>
            </div>
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
        <div className="w-72 h-40 rounded-xl relative mr-6">
            <img src={`${imageUrl}`} alt={`${imageUrl}`} className="bg-cover bg-center bg-no-repeat rounded-lg w-full h-full" onClick={previewWallpaper} />
            <div className="absolute top-0 right-0 m-1 z-10">
                <MiniButton variant="default" className="mx-1" onClickFunction={() => { navigate(`/edit/${wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton variant="destructive"><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>

            {isModalOpen && <PreviewModal imageUrl={imageUrl} closeModal={() => setIsModalOpen(false)} />}
        </div>
    )
}

export default WallpaperPreview