export class Weather{
    constructor({location, current}){
        this.temperature = current.temp_c
        this.condition = current.condition.text
    }
}