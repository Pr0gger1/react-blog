import React from 'react';
import classes from "./TextAreaComponent.module.css";

const TextAreaComponent = ({ customClass = '', children, ...props}) => {
    return (
        <textarea className={[classes.textarea__common, customClass].join(' ')} {...props}
                value={children}>
        </textarea>
    );
};

export default TextAreaComponent;