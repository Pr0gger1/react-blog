import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ModalWindow from "./UI/modalWindow/modalWindow";
import LoginForm from "./Forms/LoginForm";
import {AuthContext} from "../context/auth.context";

import classes from "../styles/NavbarUser.module.css";

const NavBar = () => {
    const auth = useContext(AuthContext);
    const Navigate = useNavigate();

    const [isModalActive, setIsModalActive] = useState(false);

    const logoutHandler = e => {
        e.preventDefault();
        auth.logout();
        Navigate("/");
    }

    return (
        <nav className="header__navbar">
            <div className="navbar__element">
                <Link to="/categories">
                    Категории
                </Link>
            </div>
            {
                auth.isAuth
                ?
                    <div className={["navbar__element", classes.user].join(" ")} id="user">
                        <Link to={`/user/${auth.userId}`}>
                            {auth.userData.username}
                        </Link>
                        <div className={classes.logout} onClick={e => logoutHandler(e)}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </div>
                    </div>

                :
                    <div className="navbar__element login" onClick={() => setIsModalActive(true)}>
                        <i className="fa-solid fa-user icon"></i>
                        Войти
                    </div>
            }
            <ModalWindow visible={isModalActive} setVisible={setIsModalActive}>
                <LoginForm isModalActive={isModalActive}/>
            </ModalWindow>

        </nav>
    );
};

export default NavBar;