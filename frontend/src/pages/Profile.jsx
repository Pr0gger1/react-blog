import React, {useEffect, useState} from 'react';
// import {AuthContext} from "../context/auth.context";
import avatar from "../upload/smile.jpg";
import classes from "./styles/Profile.module.css";
import InputComponent from "../components/UI/input/InputComponent";
import CardBlock from "../components/UI/CardBlock/CardBlock";
import {useHttp} from "../hooks/useHttp";
import {useParams} from "react-router-dom";


const Profile = () => {
    // const auth = useContext(AuthContext);
    const {request, requestError} = useHttp();
    const params = useParams();
    const userId = params.id;

    const [userData, setUserData] = useState({
        email: "",
        username: ""
    });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchUser =async () => {
            setIsLoading(true);
            await request(`/api/users/user/${userId}`, "GET", null)
                .then(r => {
                    setUserData(r[0]);
                })
            setIsLoading(false);
        }
        fetchUser();
    }, [request, userId]);


    if (requestError) {
        return (
            <div className="main__content">
                Error!
            </div>
        );
    }
    else if (isLoading) {
        return (
        <div className="main__content">
            Loading
        </div>
        );
    }

    return (
        <div className="main__content">
            <CardBlock customClass={classes.user__panel}>
                <div className={classes.user__avatar}>
                    <img src={avatar} alt=""/>
                </div>
                <div className={classes.user__name}>
                    {userData.username}
                </div>
            </CardBlock>
            <section className={classes.profile__wrapper}>
                <CardBlock customClass={classes.user__info}>
                    <InputComponent type="text" value={userData.email} disabled/>
                </CardBlock>
                <CardBlock>
                    vfsb
                </CardBlock>
            </section>
        </div>
    );
};

export default Profile;