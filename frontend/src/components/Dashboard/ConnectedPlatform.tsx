import { LucideCheck, LucideX } from 'lucide-react'
import MiniButton from '../ui/MiniButton'

const ConnectedPlatform = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <div className="flex">
                <h1 className="font-[ChivoMedium] text-3xl relative inline-block underline">
                    <span className="w-full h-1 absolute bottom-0 shadow-md shadow-blue-700/60 rounded-lg bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600"></span>
                    Connected Platforms
                </h1>
            </div>

            <div className='w-full h-full rounded-2xl py-2 mt-2 space-y-2'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Chrome</h1>
                    <MiniButton variant='success'><LucideCheck /></MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Firefox</h1>
                    <MiniButton variant='success'><LucideCheck /></MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Mobile</h1>
                    <MiniButton variant='success'><LucideCheck /></MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Desktop</h1>
                    <MiniButton variant='destructive'><LucideX /></MiniButton>
                </div>
            </div>

        </div>
    )
}

export default ConnectedPlatform