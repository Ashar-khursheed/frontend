import React from "react";

export const CustomCheckbox = ({ children, title, quantity, id }) => {



    return (
        <div className="flex items-center justify-between text-gray-700 mt-1">
            <div className="flex items-center">
                <input id={title.split("")[0] + id} type="checkbox" value="" className="outline-none w-4 h-4  border-primary rounded accent-primary" />
                <label htmlFor={title.split("")[0] + id} className="ml-2 text-sm ">{title}</label>
            </div>
            <span>{quantity}</span>
        </div>
    )
}