import { ReactNode } from "react";

interface ButtonProps {
    text?: string;
    icon?: ReactNode;
    onClickFunction?: () => void;  // Changed to proper function type
    children?: ReactNode;
    className?: string;  // Added to allow custom styling
    variant?: "default" | "destructive";
}
interface IVariants {
    default: {
        bg: string;
        text: string
    };
    destructive: {
        bg: string;
        text: string;
    };
}

const variants: IVariants = {
    default: {
        bg: "brightness-150 dark:brightness-100 group hover:shadow-md hover:shadow-blue-700/60 transition ease-in-out hover:scale-105 p-0.5 rounded-lg bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600",
        text: "group-hover:text-blue-500 text-blue-600 gap-1"
    },
    destructive: {
        bg: "brightness-150 dark:brightness-100 group hover:shadow-md hover:shadow-red-700/60 transition ease-in-out hover:scale-105 p-0.5 rounded-lg bg-gradient-to-br from-red-800 via-red-600 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-600",
        text: "group-hover:text-red-500 text-red-600 gap-1"
    }
}

const MiniButton = ({
    text,
    icon,
    onClickFunction,
    children,
    className = "",
    variant = "default"
}: ButtonProps) => {
    return (
        <button className={`${variants[variant].bg} ${className}`}
            onClick={onClickFunction}
            type="button"
        >
            <div className="p-1 backdrop-blur-xl bg-[#e8e8e8] rounded-md font-semibold w-full h-full">
                <div className={`group-hover:scale-100 flex items-center justify-center ${variants[variant].text}`}>
                    {text}
                    {children}
                    {icon}
                </div>
            </div>
        </button>
    );
};

export default MiniButton;