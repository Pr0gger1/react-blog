import React from 'react';
import InputComponent from "../UI/input/InputComponent";
import "../../styles/LoginForm.css";

const RegisterFields = ({ submitHandler, registerData, setRegisterData, error, isLoading }) => {
    const changeHandler = e => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
        // document.getElementById(`${e.target.name}__label`).textContent = "";
    }
    const preSubmitHandler = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.repeatedPassword) {
            alert("Пароли не совпадают!");
        }
        else {
            submitHandler(e);
        }
    }

    return (
        <div className="auth__fields">
            {/*<label htmlFor="username" id="username__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "username" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="nickname field"
                            id="username"
                            name="username"
                            value={registerData.username}
                            onChange={e => changeHandler(e)}
                            type="text"
                            placeholder="Придумайте ник"
                            required/>

            {/*<label htmlFor="email" id="email__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "email" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="login field"
                            name="email"
                            value={registerData.email}
                            onChange={e => changeHandler(e)}
                            type="email"
                            placeholder="E-mail"
                            required/>

            {/*<label htmlFor="password" id="password__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "password" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="password field"
                            name="password"
                            value={registerData.password}
                            onChange={e => changeHandler(e)}
                            type="password"
                            placeholder="Пароль"
                            required/>

            {/*<label htmlFor="password" id="repeatedPassword__label" className="error__container">*/}
            {/*    {error && !error.success ? error.errors.map(er => er.param === "password" ? er.msg : "") : ""}*/}
            {/*</label>*/}

            <InputComponent customClass="repeat_password field"
                            name="repeatedPassword"
                            value={registerData.repeatedPassword}
                            onChange={e => changeHandler(e)}
                            type="password"
                            placeholder="Повторите пароль"
                            required/>

            <InputComponent disabled={isLoading} customClass="submit button" type="submit" value="Зарегистрироваться" onClick={preSubmitHandler}/>
        </div>
    );
};

export default RegisterFields;