import {createContext} from "react";

function nothing() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userData: {},
    login: nothing,
    logout: nothing,
    isAuth: false
});