import {Weather} from '../domain/model/weather.entity.js'

export class WeatherAssembler{
    static toEntityFromResponse(response){
        return new Weather({
            location: response.location,
            current: response.current
        })
    }
}