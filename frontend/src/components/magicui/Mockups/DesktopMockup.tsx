import { ReactNode } from "react"

interface IDesktopMockup {
    children?: ReactNode;
    imageUrl?: string;
    onClick?: () => void
}

const DesktopMockup = ({ children, imageUrl, onClick }: IDesktopMockup) => {
    return (
        <div className="mockup-browser border bg-background relative">
            <div className="mockup-browser-toolbar">
            </div>
            <div className="border-t h-full" onClick={(e) => e.stopPropagation()}>
                {children}
                {imageUrl && <img src={`${imageUrl}`} onClick={onClick} />}
            </div>
        </div>
    )
}

export default DesktopMockup