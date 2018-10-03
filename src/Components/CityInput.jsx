import React from 'react';

export default function CityInput(props) {
    return(
        <div>
            <div>City: {props.city}, your IP: {props.ip}</div>
            <input value={props.city} onChange={props.onCityChange} type="text" name="name" />
            <button onClick={props.fetchData}>Get weather</button>
        </div>
    );
}