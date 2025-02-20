import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { atom, useAtom } from "jotai"

import MiniButton from "../ui/MiniButton"
import PreviewModal from "../ui/Modals/PreviewModal"
import ConfirmDeleteModal from "../ui/Modals/ConfirmDeleteModal"
import { LucidePen, LucideTrash2 } from "lucide-react"

const modalOpen = atom<boolean>(false)
const wallpaperId = '1'

const WallpaperPreview = ({ imageUrl }: { imageUrl: string }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useAtom(modalOpen)

    const previewWallpaper = () => {
        setIsModalOpen((prev) => !prev)
    }

    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModal] = useState(false)

    const openDeleteConfirmModal = () => {
        setIsDeleteConfirmModal((prev) => !prev)
    }


    return (
        <div className="w-72 h-40 rounded-xl relative mr-6 border-2">
            <img src={`${imageUrl}`} alt={`${imageUrl}`} className="bg-cover bg-center bg-no-repeat rounded-xl w-full h-full" onClick={previewWallpaper} />
            <div className="absolute top-0 right-0 m-1 z-10">
                <MiniButton variant="default" className="mx-1" onClickFunction={() => { navigate(`/edit/${wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton variant="destructive" onClickFunction={openDeleteConfirmModal}><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>

            {isDeleteConfirmModalOpen && <ConfirmDeleteModal closeModal={() => setIsDeleteConfirmModal(false)} />}

            {isModalOpen && <PreviewModal imageUrl={imageUrl} closeModal={() => setIsModalOpen(false)} />}
        </div>
    )
}

export default WallpaperPreview