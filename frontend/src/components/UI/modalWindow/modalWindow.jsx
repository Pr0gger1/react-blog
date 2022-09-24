import React, {useContext, useEffect} from 'react';
import classes from "./modalWindow.module.css";
import {AuthContext} from "../../../context/auth.context";

const ModalWindow = ({children, visible, setVisible}) => {
    const {isAuth} = useContext(AuthContext)
    useEffect(() => {
        if (isAuth) {
            setVisible(false);
        }
    }, [isAuth, setVisible]);


    const rootClasses = [classes.modal__window];
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modal__content} onClick={e => e.stopPropagation()}>
                <div className={classes.top__panel}>
                    <div className={classes.close__btn} onClick={() => setVisible(false)}></div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;