import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const Input = (props: InputProps) => {
    return (
        <div className=" flex justify-center items-center relative rounded-xl transition-shadow duration-300 ease-in-out focus-within:shadow-lg focus-within:shadow-blue-700/60">
            {/* Outer gradient ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 rounded-xl p-1">
                {/* Inner container for ring */}
                <div className="bg-[#e8e8e8] rounded-lg h-full w-full"></div>
            </div>

            {/* Actual Input Field */}
            <input
                type="text"
                name="text"
                value={props.value}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                placeholder={props.placeholder}
                autoComplete="off"
                className="relative bg-transparent text-zinc-600 outline-none placeholder:text-zinc-600 placeholder:opacity-50 px-4 py-2 w-full focus:ring-0 focus:outline-none"
            />
        </div>
    );
};

export default Input;
