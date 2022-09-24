import React from 'react';
import classes from './InputComponent.module.css';

const InputComponent = ({customClass = '', ...props}) => {
    return (
        <input className={[classes.input__common, customClass].join(' ')} {...props}/>
    );
};

export default InputComponent;