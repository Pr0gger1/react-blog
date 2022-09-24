import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/auth.context";
import InputComponent from "../UI/input/InputComponent";
import RegisterFields from "./RegisterFields";
import LoginFields from "./LoginFields";
import {useHttp} from "../../hooks/useHttp";
import ToastNotify from "../UI/ToastNotify/ToastNotify";


const LoginForm = ({ isModalActive }) => {
    const auth = useContext(AuthContext);
    const [authType, setAuthType] = useState("signIn");
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        repeatedPassword: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const {isLoading, requestError, request} = useHttp();

    useEffect(() => {
        if (requestError) {
            alert(requestError.errors[0].msg)
        }
    }, [requestError]);
    useEffect(() => {
        if (!isModalActive) {
            setRegisterData({
                username: "",
                email: "",
                password: "",
                repeatedPassword: ""
            });

            setLoginData({
                email: "",
                password: ""
            });
        }
    }, [isModalActive])

    const submitHandler = async () => {
        if (authType === "signIn") {
            const data = await request("/api/auth/login", "POST", {...loginData});
            if (!requestError) {
                auth.login(data);
            }
        }
        else {
            await request("/api/auth/register", "POST", {...registerData});

        }
    }

    return (
        <form className="form__login">
            <div className="auth__type">
                <InputComponent checked={authType === "signIn"}
                                id="signIn"
                                type="radio"
                                value="signIn"
                                name="action"
                                onChange={e => setAuthType(e.target.value)}/>
                <label htmlFor="signIn" className="auth_type__label">Вход</label>

                <InputComponent checked={authType === "signUp"}
                                id="signUp"
                                type="radio"
                                value="signUp"
                                name="action"
                                onChange={e => setAuthType(e.target.value)}/>
                <label htmlFor="signUp" className="auth_type__label">Регистрация</label>
            </div>
            {
                authType === "signIn"
                ?
                    <LoginFields submitHandler={submitHandler}
                                 loginData={loginData}
                                 setLoginData={setLoginData}
                                 error={requestError}
                                 isLoading={isLoading}/>
                :
                    <RegisterFields submitHandler={submitHandler}
                                    registerData={registerData}
                                    setRegisterData={setRegisterData}
                                    error={requestError}
                                    isLoading={isLoading}/>
            }
            <label htmlFor="password" className="error__container">
            </label>
        </form>
    );
};

export default LoginForm;