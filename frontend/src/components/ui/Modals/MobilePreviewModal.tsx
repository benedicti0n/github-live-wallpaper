const MobilePreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="h-full p-5">
            <div className="mockup-phone h-full">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display text-white h-full bg-cover" onClick={(e) => e.stopPropagation()}>
                    <img src={imageUrl} alt={imageUrl} className="h-full bg-cover" />
                </div>
            </div>
        </div>
    );
};

export default MobilePreviewModal; 