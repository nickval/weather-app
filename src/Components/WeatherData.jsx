import React from "react";

export default function WeatherData(props) {
    return(
        <div>
            <div>{props.name}</div>
            {props.image && <img src={props.image} alt='Weather'></img>}
            <div>{props.data}</div>
        </div>
    )
}