import React, {useContext, useEffect} from 'react';
import InputComponent from "./UI/input/InputComponent";
import SelectComponent from "./UI/select/SelectComponent";
import "../styles/Filter.css";
import Button from "./UI/button/Button";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

const Filter = ({ filter, setFilter }) => {
    const Navigator = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const filterData = JSON.parse(localStorage.getItem("filterData"));
        if (filterData.sort) {
            setFilter({...filter, search: filterData.search});
            setFilter({...filter, sort: filterData.sort});
        }
    }, []);

    useEffect(() => {
        let filterData = JSON.stringify({
            search: "",
            sort: ""
        });

        if (filter.sort || filter.query) {
            filterData = JSON.stringify({
                search: filter.search,
                sort: filter.sort
            });
        }

        localStorage.setItem("filterData" , filterData);
    }, [filter]);


    return (
        <div className="content__filter">
            <Button customClass="write_post__button filter__component"
                    disabled={!auth.isAuth}
                    onClick={() => Navigator("/write-post")}>
                <i className="fa-solid fa-pen"></i>
                Написать пост
            </Button>

            <InputComponent id="big" type="search"
                            placeholder="Поиск..."
                            customClass="search filter__component"
                            value={filter.search}
                            onChange={e => setFilter({...filter, search: e.target.value})}/>

            <SelectComponent customClass="filter__component" options={[
                {value: "title", name: "по названию"},
                {value: "content", name: "по контенту"},
                {value: "created_at", name: "по времени публикации"}

            ]}
                defaultValue="Сортировать по"
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            />
        </div>
    );
};

export default Filter;