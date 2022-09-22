import {useState, useCallback, useEffect} from "react";


const storageName = "userAuthData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserdata] = useState(null);

    const login = useCallback((userRequest) => {
        setToken(userRequest.token);
        setUserId(userRequest.userId);
        setUserdata({
            userId: userRequest.userId,
            username: userRequest.username,
            email: userRequest.email
        });

        localStorage.setItem(storageName, JSON.stringify({
            userId: userRequest.userId,
            token: userRequest.token,
            username: userRequest.username,
            email: userRequest.email
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserdata(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data);
        }
    }, [login]);

    return {login, logout, token, userId, userData};
}