import { ReactNode, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { LucideCheck, LucideX } from 'lucide-react'

import MiniButton from '../ui/MiniButton'
import { useConnectedPlatforms } from '../../hooks/useConnectesPlatforms'


const ConnectedPlatform = () => {
    const { user } = useUser()
    const userId = user?.id

    const { platforms, fetchConnectedPlatformsDetails } = useConnectedPlatforms()

    useEffect(() => {
        fetchConnectedPlatformsDetails(userId)
    }, [])

    return (
        <div className='h-full w-full flex flex-col'>
            <div className="flex">
                <h1 className="font-[ChivoMedium] text-3xl relative inline-block underline">
                    <span className="w-full h-1 absolute bottom-0 shadow-md shadow-blue-700/60 rounded-lg bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600"></span>
                    Connected Platforms
                </h1>
            </div>

            <div className='w-1/2 h-full rounded-2xl py-2 mt-2 space-y-2'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Chrome</h1>
                    <MiniButton variant={platforms?.chrome ? "success" : "destructive"}>{platforms?.chrome ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Firefox</h1>
                    <MiniButton variant={platforms?.firefox ? "success" : "destructive"}>{platforms?.firefox ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Mobile</h1>
                    <MiniButton variant={platforms?.brave ? "success" : "destructive"}>{platforms?.brave ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Desktop</h1>
                    <MiniButton variant={platforms?.mobile ? "success" : "destructive"}>{platforms?.mobile ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-[ChivoMedium] text-lg'>Desktop</h1>
                    <MiniButton variant={platforms?.desktop ? "success" : "destructive"}>{platforms?.desktop ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>

            </div>

        </div>
    )
}

export default ConnectedPlatform