import { LucideArrowLeft, LucideTrash2 } from "lucide-react"
import MiniButton from "../MiniButton"

const serverUrl = import.meta.env.VITE_SERVER_URL
interface IConfirmDeleteModal {
    closeModal: () => void;
    wallpaperId: string;
    platformOf: string;
    userId: string | undefined;
}

const ConfirmDeleteModal = (props: IConfirmDeleteModal) => {
    const platformOf = props.platformOf
    const userId = props.userId
    const wallpaperId = props.wallpaperId

    const deleteWallpaper = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/v1/wallpaper/deleteWallpaper`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ wallpaperId, platformOf, userId })
            })

            const data = await response.json()
            if (data.success) {
                alert("Wallpaper deleted successfully")
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div
            className="fixed inset-0 z-50 bg-opacity-75 flex justify-center items-center"
            onClick={props.closeModal}
        >
            <div className="justify-center items-center p-1 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60">
                <div className="h-full w-full flex flex-col justify-center items-center rounded-xl px-6 py-4 bg-[#e8e8e8]">
                    <h1 className="text-xl font-[ChivoMedium]">Are you sure you want to delete this wallpaper?</h1>
                    <div className="flex mt-4 gap-4">
                        <MiniButton onClickFunction={props.closeModal}><LucideArrowLeft /></MiniButton>
                        <MiniButton onClickFunction={() => deleteWallpaper()} variant="destructive"><LucideTrash2 /></MiniButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal