import { LucideArrowLeft, LucideTrash2 } from "lucide-react"
import MiniButton from "../MiniButton"

const ConfirmDeleteModal = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-opacity-75 flex justify-center items-center"
            onClick={closeModal}
        >
            <div className="justify-center items-center p-1 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60">
                <div className="h-full w-full flex flex-col justify-center items-center rounded-xl px-6 py-4 bg-[#e8e8e8]">
                    <h1 className="text-xl font-[ChivoMedium]">Are you sure you want to delete this wallpaper?</h1>
                    <div className="flex mt-4 gap-4">
                        <MiniButton onClickFunction={closeModal}><LucideArrowLeft /></MiniButton>
                        <MiniButton onClickFunction={closeModal} variant="destructive"><LucideTrash2 /></MiniButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal