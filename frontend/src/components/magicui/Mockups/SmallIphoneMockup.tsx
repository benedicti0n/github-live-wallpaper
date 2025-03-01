interface SmallIPhoneMockupProps {
    imageUrl?: string;
    className?: string;
    onClick: () => void;
}

export default function SmallIPhoneMockup({ imageUrl, className, onClick }: SmallIPhoneMockupProps) {
    return (
        <div className={`inline-block ${className}`}>
            {/* iPhone container - small size */}
            <div className="relative w-[160px] h-[280px] rounded-[24px] bg-black shadow-md overflow-hidden">
                {/* Bezel */}
                <div className="absolute inset-[2px] rounded-[22px] overflow-hidden bg-black border border-gray-800">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[10px] bg-black rounded-b-[6px] z-20"></div>

                    {/* Screen Content - Wallpaper */}
                    <div className="absolute inset-0 z-10 overflow-hidden">
                        <div className="relative w-full h-full">
                            <img
                                src={imageUrl}
                                alt="iPhone wallpaper"
                                className="object-cover"
                                onClick={onClick}
                            />

                            {/* Time overlay */}
                            <div className="absolute top-3 w-full text-center">
                                <div className="text-[10px] font-medium text-white drop-shadow-md">9:41</div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-[30%] bg-white/70 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Side Button - simplified */}
                <div className="absolute right-[-1px] top-[50px] w-[1px] h-[12px] bg-gray-600"></div>

                {/* Volume Buttons - simplified */}
                <div className="absolute left-[-1px] top-[40px] w-[1px] h-[10px] bg-gray-600"></div>
                <div className="absolute left-[-1px] top-[55px] w-[1px] h-[10px] bg-gray-600"></div>
            </div>
        </div>
    )
}

