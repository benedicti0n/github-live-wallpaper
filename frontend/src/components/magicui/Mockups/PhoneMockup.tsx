import { ReactNode } from "react"

interface IPhoneMockup {
    children: ReactNode;
}

const PhoneMockup = ({ children }: IPhoneMockup) => {
    return (
        <div className="h-full p-5">
            <div className="mockup-phone h-full">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display text-white h-full bg-cover" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PhoneMockup