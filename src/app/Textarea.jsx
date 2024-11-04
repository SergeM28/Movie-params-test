import React from 'react';

const TextArea = ({ name, label, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="self-start text-base">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-5 pt-4 pb-[5.5rem] mt-3.5 text-base tracking-tight bg-white rounded-md border border-solid border-black border-opacity-20 max-md:pr-5 max-md:pb-28 max-md:max-w-full"
            ></textarea>
        </div>
    );
}

export default TextArea;