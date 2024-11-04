import React, { useState } from 'react';

const SelectField = ({ name, label, options, value, onChange, error, errorAnimation, placeholder }) => {
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
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    className='text-base w-full bg-transparent p-4 outline-none'
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && isTouched && (
                    <div className={`text-sm leading-none text-[#BE1F2A] absolute flex right-4 ${errorAnimation}`}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectField;