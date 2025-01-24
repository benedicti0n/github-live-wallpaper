import Button from './ui/Button'
import Sparkle from '../icons/Sparkle'

const Navbar = () => {
    return (
        <div className='w-full p-1 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60'>
            <div className='w-full flex justify-between items-center rounded-xl p-2 bg-[#e8e8e8]'>
                <img src="" alt="" />
                <Button text="SignIn" icon={<Sparkle />} />
            </div>
        </div>
    )
}

export default Navbar