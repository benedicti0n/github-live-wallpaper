import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Button from './ui/Button';
import { LucideLogIn } from "lucide-react";

const Navbar = () => {
    return (
        <div className='w-3/4 h-auto p-1 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-lg shadow-blue-700/60 my-2'>
            <div className='w-full h-18 flex justify-between items-center rounded-xl p-2 bg-[#e8e8e8]'>
                <div className='h-full flex items-center'>
                    <img src="/logo.png" alt="Logo" className='h-full' />
                    <h1 className='font-semibold text-blue-600'>Github Live Wallpaper</h1>
                </div>

                <SignedOut>
                    <Button icon={<LucideLogIn />}>
                        <SignInButton>
                        </SignInButton>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "clerk-custom-avatar",
                                userButtonPopoverCard: "bg-white shadow-xl border border-gray-200 rounded-xl p-4",
                                userButtonPopoverActionButton: "text-blue-600 hover:bg-blue-100 transition-all duration-200",
                                userButtonPopoverFooter: "text-sm text-gray-400",
                            },
                        }}
                    />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;
