import { useEffect } from 'react'
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
        <div className='w-2/5 flex flex-col h-full'>
            <h1 className="font-semibold text-3xl relative mb-4">
                Connected Platforms
            </h1>

            <div className='w-full h-full rounded-2xl space-y-2'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-medium text-lg'>Extension</h1>
                    <MiniButton variant={platforms?.extension ? "success" : "destructive"}>{platforms?.extension ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-medium text-lg'>Mobile</h1>
                    <MiniButton variant={platforms?.mobile ? "success" : "destructive"}>{platforms?.mobile ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-medium text-lg'>Desktop</h1>
                    <MiniButton variant={platforms?.desktop ? "success" : "destructive"}>{platforms?.desktop ? <LucideCheck /> : <LucideX />}</MiniButton>
                </div>
            </div>

        </div>
    )
}

export default ConnectedPlatform