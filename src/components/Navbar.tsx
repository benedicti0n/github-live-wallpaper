import Button from './ui/Button'
import Sparkle from '../icons/Sparkle'

const Navbar = () => {
    return (
        <div className='w-full h-auto p-1 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60'>
            <div className='w-full h-18 flex justify-between items-center rounded-xl p-2 bg-[#e8e8e8]'>
                <div className='h-full flex items-center'>
                    <img src="/logo.png" alt="" className='h-full' />
                    <h1 className='font-semibold text-blue-600'>Github Live Wallpaper</h1>
                </div>
                <Button text="SignIn" icon={<Sparkle />} />
            </div>
        </div>
    )
}

export default Navbar