import React from 'react';
import classes from "./SelectComponent.module.css";

const SelectComponent = ({ options, defaultValue, value, customClass = '', onChange }) => {
    return (
        <select className={[classes.select__common, customClass].join(' ')}
                value={value}
                onChange={e => onChange(e.target.value)}>

            <option disabled value="default">{defaultValue}</option>
            {
                options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )
            }
        </select>
    );
};

export default SelectComponent;