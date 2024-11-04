import React, { useState } from 'react';

const InputField = ({ name, label, type, placeholder, value, onChange, error, errorAnimation }) => {
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="self-start text-base">
                {label}
            </label>
            <div className={`flex flex-wrap gap-5 justify-between mt-3.5 mb-6 bg-white rounded-md border relative items-center ${error && isTouched ? 'border-[#BE1F2A]' : 'border-black border-opacity-20'} border-solid max-md:mr-0.5 max-md:max-w-full ${errorAnimation}`}>
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    className="text-base w-full bg-transparent p-4 outline-none"
                />
                {error && isTouched && (
                    <div className={`text-sm leading-none text-right text-[#BE1F2A] absolute flex right-4 ${errorAnimation}`}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputField;