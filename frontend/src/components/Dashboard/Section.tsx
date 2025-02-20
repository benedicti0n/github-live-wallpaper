import AvailableWallpaper from "./AvailableWallpaper"

interface SectionProps {
    heading: string
    wallpapers: [{
        wallpaperId: string,
        link: string,
    }] | undefined
}

const Section = (props: SectionProps) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex">
                <h1 className="font-[ChivoMedium] text-3xl relative inline-block underline">
                    <span className="w-full h-1 absolute bottom-0 shadow-md shadow-blue-700/60 rounded-lg bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600"></span>
                    {props.heading}
                </h1>
            </div>
            <AvailableWallpaper platform={props.heading} wallpapers={props.wallpapers} />
        </div>
    )
}

export default Section