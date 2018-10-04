import React from "react";

export default function WeatherData(props) {
    return(
        <div className = "Data">
            <div className = "InlineDiv">{props.name}</div>
            {props.image && <img src={props.image} alt='Weather'></img>}
            <div className = "InlineDiv"><b>{props.data}</b></div>
        </div>
    )
}