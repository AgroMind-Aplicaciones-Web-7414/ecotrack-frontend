import axios from 'axios'
import {WeatherAssembler as WhaterAssembler, WeatherAssembler} from './weather.assembler.js'

const API_URL = "http://api.weatherapi.com/v1/current.json?key=d8020360b6a448fe9e1172139250810&q=Peru&aqi=yes"

export class WeatherApi{
    async getWeather(){
        const response = await axios.get(API_URL)
        return WeatherAssembler.toEntityFromResponse(response.data)
    }
}