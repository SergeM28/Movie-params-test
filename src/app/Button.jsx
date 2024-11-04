import React from 'react';

const Button = ({ text, className, icon, onClick, disabled }) => {

    return (
        <button className={`${className} ${disabled ? 'cursor-not-allowed' : ''} overflow-hidden`} onClick={onClick} disabled={disabled}>
            <span className="self-stretch px-4 my-auto rounded-none max-md:px-5 relative z-10">
                {text}
            </span>
            {icon && <img src='/icon.svg' alt="Next step" className={`object-contain ${disabled ? '' : 'filter: black(100%) saturate(100%) invert(100%)'} z-10 shrink-0 self-stretch my-auto w-4 aspect-[1.14]`} />}
        </button>
    );
}

export default Button