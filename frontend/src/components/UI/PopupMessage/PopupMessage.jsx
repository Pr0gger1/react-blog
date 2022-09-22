import React, {useEffect} from 'react';
import classes from "./PopupMessage.module.css";

const PopupMessage = ({ children, typeMessage = "" }) => {
    useEffect(() => {
        setTimeout(() => {
            let message = document.getElementsByClassName(classes.popup);
            while (message[0]) {
                message[0].parentNode.removeChild(message[0]);
            }
        }, 3000)
    }, []);

    return (
        <div className={[classes.popup, typeMessage].join(" ")}>
            {children}
        </div>
    );
};

export default PopupMessage;