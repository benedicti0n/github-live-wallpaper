import { ReactNode } from "react";

interface ButtonProps {
    text?: string;
    icon?: ReactNode;
    onClickFunction?: () => void;  // Changed to proper function type
    children?: ReactNode;
    className?: string;  // Added to allow custom styling
}

const Button = ({
    text,
    icon,
    onClickFunction,
    children,
    className = ""
}: ButtonProps) => {
    return (
        <button className={`brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-blue-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600 ${className}`}
            onClick={onClickFunction}
            type="button"
        >
            <div className="px-6 py-2 backdrop-blur-xl bg-[#e8e8e8] rounded-lg font-semibold w-full h-full">
                <div className="group-hover:scale-100 flex items-center justify-center group-hover:text-blue-500 text-blue-600 gap-1">
                    {text}
                    {children}
                    {icon}
                </div>
            </div>
        </button>
    );
};

export default Button;