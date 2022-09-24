import React from 'react';
import InputComponent from "../UI/input/InputComponent";
import "../../styles/LoginForm.css";

const LoginFields = ({ submitHandler, loginData, setLoginData, error, isLoading }) => {

    const changeHandler = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
        // document.getElementById(`${e.target.name}__label`).textContent = "";
    }

    return (
        <div className="auth__fields">
            {/*<label htmlFor="email" id="email__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "email" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="login field"
                            id="email"
                            value={loginData.email}
                            onChange={e => changeHandler(e)}
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required/>

            {/*<label htmlFor="password" id="password__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "password" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="password field"
                            id="password"
                            value={loginData.password}
                            onChange={e => changeHandler(e)}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            required/>

            <InputComponent disabled={isLoading} customClass="submit button" type="submit" value="Войти" onClick={submitHandler}/>
        </div>
    );
};

export default LoginFields;