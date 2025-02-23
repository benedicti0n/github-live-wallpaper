import { ReactNode } from "react";
import { GlowEffect } from "./glow-effect";

interface ButtonProps {
    text?: string;
    icon?: ReactNode;
    onClickFunction?: () => void;  // Changed to proper function type
    children?: ReactNode;
    className?: string;  // Added to allow custom styling
    variant?: "default" | "destructive" | "success";
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
    success: {
        bg: string;
        text: string;
    };
}

const variants: IVariants = {
    default: {
        bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg ",
        text: "group-hover:text-blue-500 text-blue-600 gap-1"
    },
    destructive: {
        bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg",
        text: "group-hover:text-red-500 text-red-600 gap-1"
    },
    success: {
        bg: "brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-0.5 rounded-lg",
        text: "group-hover:text-green-500 text-green-600 gap-1"
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
            <GlowEffect
                mode='colorShift'
                blur='soft'
                duration={3}
                scale={0.8}
            />
            <div className="p-1 backdrop-blur-xl bg-background rounded-md w-full h-full">
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