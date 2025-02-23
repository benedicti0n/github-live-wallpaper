const ExtensionPreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="mockup-browser border-base-300 border w-2/3 bg-background relative">
            <div className="mockup-browser-toolbar">
                <div className="input text-secondary">https://gitpaper.kasukabelabs.com</div>
            </div>
            <div className="grid place-content-center border-t h-full" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt={imageUrl} className="w-full h-full bg-cover" />
            </div>
        </div>
    );
};

export default ExtensionPreviewModal; 