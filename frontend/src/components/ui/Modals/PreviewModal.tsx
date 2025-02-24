import ExtensionPreviewModal from './ExtensionPreviewModal';
import MobilePreviewModal from './MobilePreviewModal';
import DesktopPreviewModal from './DesktopPreviewModal';

interface IPreviewModal {
    imageUrl: string;
    closeModal: () => void;
    platformOf: string
}

const PreviewModal = (props: IPreviewModal) => {
    const modalContent = {
        extension: <ExtensionPreviewModal imageUrl={props.imageUrl} />,
        mobile: <MobilePreviewModal imageUrl={props.imageUrl} />,
        desktop: <DesktopPreviewModal imageUrl={props.imageUrl} />,
    }[props.platformOf] || null; // Default to null if no match

    return (
        <div
            className="fixed inset-0 z-50 backdrop-blur-xs flex justify-center items-center px-32"
            onClick={props.closeModal}
        >
            {modalContent}
        </div>
    );
};

export default PreviewModal

