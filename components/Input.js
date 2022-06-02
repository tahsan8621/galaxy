import React from 'react';

const Input = ({type,placeholder,required,onChange, children}) => {
    return (
        <div className="input_container">
            {children}
            <input type={type} required={required} className="input_field" placeholder={placeholder} onChange={onChange}/>
        </div>

    );
}
export default Input;
