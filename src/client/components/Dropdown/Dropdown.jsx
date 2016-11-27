import React from 'react';
import uuid from "uuid";
import classNames from "classnames";

export default function ({items, className, handleClick}) { 
    const classes = classNames(className, "dropdown")
    return (
        <ul className={classes} onClick={handleClick}>
            {items.map(el => <li key={uuid.v4()} className="item">{el}</li>)}
        </ul>
    )
}