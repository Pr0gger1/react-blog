import React from 'react';
import classes from "./Button.module.css"

const Button = ({ children, customClass = [], ...props }) => {
    return (
        <button className={[classes.button__common, customClass].join(' ')} {...props}>
            {children}
        </button>
    );
};

export default Button;