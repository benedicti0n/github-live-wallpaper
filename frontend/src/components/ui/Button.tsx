import { ReactNode } from "react";
import { GlowEffect } from "./glow-effect";

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
        <div className="flex items-center font-semibold rounded-xl hover:scale-105 ease-in-out duration-300 text-base relative">
            <GlowEffect
                colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
                mode='colorShift'
                blur='soft'
                duration={3}
                scale={0.9}
            />
            <button className={`flex justify-center items-center px-6 py-2 gap-2 bg-background z-10 rounded-xl h-full w-full ${className}`}
                onClick={onClickFunction}
                type="button"
            >
                {text}
                {children}
                {icon}
            </button>
        </div>

    );
};

export default Button;