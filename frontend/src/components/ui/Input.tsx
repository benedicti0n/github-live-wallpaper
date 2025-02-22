import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const Input = (props: InputProps) => {
    return (
        <input
            type="text"
            name="text"
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder}
            autoComplete="off"
            className="flex justify-center items-center rounded-xl transition-shadow duration-300 border border-border focus:shadow-lg relative h-full w-full  bg-background text-zinc-600 outline-none placeholder:text-zinc-600 placeholder:opacity-50 px-4 py-2 focus:ring-0 focus:outline-none"
        />
    );
};

export default Input;
