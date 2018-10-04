import React, { Component } from 'react';
import './App.css';
import WeatherData from './Components/WeatherData'
import CityInput from './Components/CityInput';

const Url = 'https://proxy-qurgawuxei.now.sh/data/2.5/weather?',
      Key = '658721d6e405c4c2214c53df32583a7a',
      IconURL = 'http://openweathermap.org/img/w/';
let   gotIp,
      errorMessage = 'Getting your IP ...';

class App extends Component {
  state = {
    cityName: '',
    ip: '',
    weatherData: [
      {
        name: '',
        image: '',
        data: ''
      }
    ]
  }
  onCityChange = (event) => {
    this.setState({
      cityName: event.target.value
    })
}

setData = (data) => {
  let _weather = [];
  _weather.push({
    name: 'temperature',
    image: this.iconURLCreate(data.weather[0].icon),
    data: data.main.temp
  });
  _weather.push({
    name: 'wind',
    data: data.wind.speed
  });
  _weather.push({
    name: 'clouds',
    data: data.clouds.all
  });
  this.setState({
    weatherData: _weather
  })
}

iconURLCreate(id){
  console.log(`icon ${id}`);
  return `${IconURL}${id}.png`;
}

fetchData = () => {
  fetch(Url + 'q=' + this.state.cityName + '&appid=' + Key)
    .then(res => res.json())
    .then((res) => 
    {
      this.setData(res);
    }).catch(
      (err) => {
        console.log(err);
        this.setState({
          weatherData: [{name: "There are no weather for your city."}]
        })
      }
    );
}

ipLookUp = () => {
  fetch('https://ipinfo.io/json/')
    .then(res => res.json())
    .then(
      (result) => {
        gotIp = true;
        this.setState({
          cityName: result.city,
          ip: result.ip
        });
        this.fetchData();
      }
    ).catch(
      (err) => 
      {
        console.log(err);
        errorMessage = 'Can\'t get your IP. Please reload page';
      }
    )
  }
  componentWillMount(){
    if(!gotIp) {
      this.ipLookUp();
    }
  }

  render() {
    if(!gotIp) {
      return errorMessage;
    }
    return (
      <div className="App">
          <CityInput fetchData={this.fetchData} 
                    onCityChange={this.onCityChange} 
                    city={this.state.cityName}
                    ip={this.state.ip}/>
          {this.state.weatherData.map((item, idx) => 
            <WeatherData key = {`wd${idx}`} name = {item.name} image = {item.image} data = {item.data}/>)
          }
          
      </div>
    );
  }
}

export default App;
