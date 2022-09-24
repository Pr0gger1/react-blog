import React from 'react';
import classes from "./TextContainer.module.css";

const TextContainer = ({customClass = '', children, ...props}) => {
    return (
        <div className={[classes.text_container__common, customClass].join(' ')}
            contentEditable={true} {...props} suppressContentEditableWarning={true}>
            {children}
        </div>
    );
};

export default TextContainer;