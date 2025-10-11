import axios from 'axios'
import {WeatherAssembler as WhaterAssembler, WeatherAssembler} from './weather.assembler.js'

export class WeatherApi{
    baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
    apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    location = import.meta.env.VITE_WEATHER_LOCATION;

    async getWeather(){
        const endpoint = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${this.location}&aqi=yes`;
        const response = await axios.get(endpoint);
        return WeatherAssembler.toEntityFromResponse(response.data);
    }
}