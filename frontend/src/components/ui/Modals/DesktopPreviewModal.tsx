const DesktopPreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="mockup-browser border w-2/3 min-h-2/3 bg-background relative">
            <div className="mockup-browser-toolbar">
            </div>
            <div className="border-t h-full" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt={imageUrl} className="w-full h-full bg-cover" />
            </div>
        </div>
    );
};

export default DesktopPreviewModal;  