interface IPreviewModal {
    imageUrl: string;
    closeModal: () => void;
}

const PreviewModal = (props: IPreviewModal) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-opacity-75 flex justify-center items-center"
            onClick={props.closeModal}
        >
            <div className="w-2/3 h-2/3 rounded-xl border-2 relative">
                <div
                    className="w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${props.imageUrl})` }}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    )
}

export default PreviewModal