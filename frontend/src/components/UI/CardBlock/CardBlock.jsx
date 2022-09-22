import React from 'react';
import classes from "./CardBlock.module.css";

const CardBlock = ({ children, customClass = '' }) => {
    return (
        <section className={[classes.card__element, customClass].join(" ")}>
            {children}
        </section>
    );
};

export default CardBlock;