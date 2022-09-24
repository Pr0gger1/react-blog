import React from 'react';
import classes from "./styles/ErrorPage.module.css";

const Error404 = () => {
    return (
        <main className="App">
            <div className="main__content">
               <div className={classes.content}>
                   <div className={classes.error__title}>
                       Ошибка 404
                   </div>
               </div>
            </div>
        </main>
    );
};

export default Error404;