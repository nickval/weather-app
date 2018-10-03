import React from 'react';

export default function CityInput(props) {
    return(
        <div  className="City">
            <div>City: {props.city}</div>
            <div>Your IP: {props.ip}</div>
            <br />
            <input value={props.city} onChange={props.onCityChange} type="text" name="name" />
            <button onClick={props.fetchData}>Get weather</button>
            <p>&nbsp;</p>
        </div>
    );
}