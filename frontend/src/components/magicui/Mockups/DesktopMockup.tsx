import { ReactNode } from "react"

interface IDesktopMockup {
    children: ReactNode;
}

const DesktopMockup = ({ children }: IDesktopMockup) => {
    return (
        <div className="mockup-browser border w-9/10 bg-background relative">
            <div className="mockup-browser-toolbar">
            </div>
            <div className="border-t h-full" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default DesktopMockup