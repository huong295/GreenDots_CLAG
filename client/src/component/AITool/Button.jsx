import React from "react";
// import "./style.css";

export const Button = ({ className, text, onClick }) => {
    return (
        <button type="button" onClick={onClick} className={`button-primary ${className}`}>
            <div className="label">{text}</div>
        </button>
    );
};