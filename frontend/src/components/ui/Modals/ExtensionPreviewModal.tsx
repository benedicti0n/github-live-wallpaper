import BrowserMockup from "@/components/magicui/Mockups/BrowserMockup";

const ExtensionPreviewModal = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <BrowserMockup>
            <img src={imageUrl} alt={imageUrl} className="w-full h-full bg-cover" />
        </BrowserMockup>
    );
};

export default ExtensionPreviewModal; 