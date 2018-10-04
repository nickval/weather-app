import React, { Component } from 'react';
import './App.css';
import WeatherData from './Components/WeatherData'
import CityInput from './Components/CityInput';
import axios from 'axios';

const Url = 'https://proxy-qurgawuxei.now.sh/data/2.5/weather?',
      Key = '658721d6e405c4c2214c53df32583a7a',
      IconURL = 'http://openweathermap.org/img/w/';
let gotIp;

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

  componentDidMount(){
    if(!gotIp) {
      this.ipLookUp();
    }
  }

  render() {
    if(!gotIp) {
      return 'Getting your IP ...'
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

  fetchData = (event) => {
    axios.get(Url + 'q=' + this.state.cityName + '&appid=' + Key).then(response => 
      {
        this.setData(response.data);
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
      ).catch()
  }
}

export default App;
