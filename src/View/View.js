import React from "react";

const View = ({descr}) => {

    return (
        <div className="view">
            <input type="checkbox" className="toggle"/>
            <label>
                <span className="description">{descr}</span>
                <span className="created"></span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    )

}

export default View