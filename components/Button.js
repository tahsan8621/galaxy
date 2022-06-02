import React from 'react';

const Button = ({type,class_name,handlerName,children}) => {
    return (
        <button type={type} className={class_name}>
            {children}
        </button>
    );
}
export default Button;
