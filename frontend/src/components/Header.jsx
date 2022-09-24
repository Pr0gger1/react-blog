import React from 'react';
import NavBar from "./NavBar";

const Header = () => {
    return (
        <header className="header__body">
            <div className="header__container">
                <a className="header__logo" href="/">
                    IT<span className="logo__carriage">_</span>News
                </a>
                <NavBar/>
            </div>
        </header>
    );
};

export default Header;