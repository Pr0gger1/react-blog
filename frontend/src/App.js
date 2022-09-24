import "./styles/App.css";
import "./styles/Content.css";
import "./styles/SideBar.css";
import "./styles/Header.css";
import "./styles/NavBar.css";
import "./styles/Footer.css";
import "./styles/LoginForm.css";
import "./components/UI/input/InputComponent.module.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React from "react";
import {AuthContext} from "./context/auth.context";
import {useAuth} from "./hooks/useAuth";

const App = () => {
    const {login, logout, token, userId, userData} = useAuth();
    const isAuth = !!token;

  return (
      <AuthContext.Provider value={{
          login, logout, token: token, userId, userData, isAuth
      }}>
          <BrowserRouter>
              <Header/>
              <AppRouter isAuth={isAuth}/>
              <Footer/>
          </BrowserRouter>
      </AuthContext.Provider>

  );
}

export default App;
