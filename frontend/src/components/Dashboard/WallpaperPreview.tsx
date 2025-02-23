import { useState } from "react"
import { useNavigate } from "react-router-dom"

import MiniButton from "../ui/MiniButton"
import PreviewModal from "../ui/Modals/PreviewModal"
import ConfirmDeleteModal from "../ui/Modals/ConfirmDeleteModal"
import { LucidePen, LucideTrash2 } from "lucide-react"

interface IWallpaperPreview {
    imageUrl: string;
    wallpaperId: string;
    platformOf: string;
    userId: string | undefined;
}

const WallpaperPreview = (props: IWallpaperPreview) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModal] = useState(false)

    const previewWallpaper = () => {
        setIsModalOpen(true)
    }

    const openDeleteConfirmModal = () => {
        setIsDeleteConfirmModal((prev) => !prev)
    }

    return (
        <div className="w-72 h-40 rounded-xl relative mr-6 border-2">
            <img src={`${props.imageUrl}`} alt={`${props.imageUrl}`} className="bg-cover bg-center bg-no-repeat rounded-xl w-full h-full" onClick={previewWallpaper} />
            <div className="absolute top-0 right-0 m-1 z-10">
                <MiniButton variant="default" className="mx-1" onClickFunction={() => { navigate(`/edit/${props.wallpaperId}`) }}><LucidePen className="h-4 w-4" /></MiniButton>
                <MiniButton variant="destructive" onClickFunction={openDeleteConfirmModal}><LucideTrash2 className="h-4 w-4" /></MiniButton>
            </div>

            {isDeleteConfirmModalOpen && <ConfirmDeleteModal closeModal={() => setIsDeleteConfirmModal(false)} wallpaperId={props.wallpaperId} platformOf={props.platformOf} userId={props.userId} />}

            {isModalOpen && <PreviewModal imageUrl={props.imageUrl} closeModal={() => setIsModalOpen(false)} platformOf={props.platformOf} />}
        </div>
    )
}

export default WallpaperPreview