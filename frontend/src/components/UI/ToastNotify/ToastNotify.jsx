import React, {useCallback, useEffect} from 'react';
import classes from "./ToastNotify.module.css";

const ToastNotify = ({ children, typeMessage = "", isActive, setIsActive }) => {
    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                let message = document.getElementsByClassName(classes.popup);
                while (message[0]) {
                    message[0].parentNode.removeChild(message[0]);
                }
            }, 3000);
            setIsActive(false);
        }
    }, []);

    return (
        <div className={[classes.popup, typeMessage].join(" ")}>
            {children}
        </div>
    );
};

export default ToastNotify;