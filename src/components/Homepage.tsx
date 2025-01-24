import Navbar from './Navbar'
import Input from './ui/Input'
import Button from './ui/Button'

const Homepage = () => {

    const fetchGithubStats = () => {

    }
    return (
        <div className='w-3/4 h-screen py-2 px-4 border-2 border-amber-400 relative'>
            <div className='w-full absolute left-0'>
                <Navbar />
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center border-2 border-amber-600'>
                <h1 className='text-5xl font-extrabold bg-gradient-to-br from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent'>Github Live Wallpaper</h1>
                <p className='text-xl font-semibold mt-2'>Generate yours now 👇🏼</p>
                <div className='mt-4 gap-1 flex'>
                    <Input />
                    <Button text='Search' />
                </div>
            </div>
        </div>
    )
}

export default Homepage